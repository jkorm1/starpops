import { type NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { JWT } from "google-auth-library"
import { sendOrderNotification } from "@/lib/telegram"


async function getSheetsClient() {
  const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS
  if (!credentials) {
    throw new Error("Google Sheets credentials not configured")
  }

  const parsedCredentials = JSON.parse(credentials)
  const auth = new JWT({
    email: parsedCredentials.client_email,
    key: parsedCredentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  return google.sheets({ version: "v4", auth })
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    const sheets = await getSheetsClient()
    const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID

    if (!spreadsheetId) {
      throw new Error("Google Sheet ID not configured")
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const date = new Date();
    const orderDate = `${date.getDate()}-${date.toLocaleString('default', { month: 'long' })}-${date.getFullYear()}; ${date.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit', hour12: true })}`;

     // Send SMS notification
    const smsResult = await sendOrderNotification(orderData, orderId)
    if (!smsResult.success) {
      console.warn("SMS notification failed:", smsResult.message)
    }

    // Prepare order data for the Orders sheet
    const orderRow = [
    orderId,
    `'${orderDate}`, // Add single quote prefix to force text format
    orderData.customer.name,
    `'${orderData.customer.phone}`, // Add single quote prefix to force text format
    orderData.customer.address,
    JSON.stringify(orderData.items.map((item: any) => ({
      ...item,
      flavor: item.category === "starter" ? "N/A" : item.flavor
    }))),
    orderData.total,
    orderData.note || "No note",
    "Pending", // Initial status
  ]

    // Add order to Orders sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Orders!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [orderRow] },
      insertDataOption: "INSERT_ROWS",
    })

    // Check if customer already exists in Customers sheet
    const customersResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Customers!A2:Z1000",
    })

    const customers = customersResponse.data.values || []
    let customerExists = false

    // Check if customer phone already exists
    for (let i = 0; i < customers.length; i++) {
      if (customers[i][1] === orderData.customer.phone) {
        customerExists = true
        break
      }
    }

    // If customer doesn't exist, add them to the Customers sheet
    if (!customerExists) {
     const customerRow = [
      orderData.customer.name,
      `'${orderData.customer.phone}`, // Add single quote prefix to force text format
      orderData.customer.address,
      `First order: ${orderId}`,
      `'${new Date().getDate()}-${new Date().toLocaleString('default', { month: 'long' })}-${new Date().getFullYear()}; ${new Date().toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit', hour12: true })}`, // Add single quote prefix to force text format
    ]


      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Customers!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [customerRow] },
        insertDataOption: "INSERT_ROWS",
      })
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order processed successfully",
    })
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    )
  }
}
