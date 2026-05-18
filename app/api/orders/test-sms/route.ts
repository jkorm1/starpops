import { NextResponse } from "next/server"
import { sendOrderNotification } from "@/lib/twilio"

export async function POST(request: NextRequest) {
  try {
    const testOrderData = {
      customer: {
        name: "Test Customer",
        phone: "+233538665125",
        email: "test@example.com",
        address: "Test Address",
      },
      items: [
        { name: "Tombrown", quantity: 2 },
        { name: "Oat", quantity: 1 },
      ],
      total: 50.00,
      note: "This is a test order",
    }

    const testOrderId = "TEST-001"

    const result = await sendOrderNotification(testOrderData, testOrderId)

    return NextResponse.json({
      success: true,
      message: "Test SMS sent",
      result,
    })
  } catch (error) {
    console.error("Error sending test SMS:", error)
    return NextResponse.json(
      { error: "Failed to send test SMS", details: error },
      { status: 500 }
    )
  }
}
