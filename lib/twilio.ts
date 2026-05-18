import { Twilio } from "twilio"

interface OrderItem {
  name: string
  quantity: number
}

interface OrderCustomer {
  name: string
  phone: string
  email: string
  address: string
}

interface OrderData {
  customer: OrderCustomer
  items: OrderItem[]
  total: number
  note?: string
}

export async function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  
  if (!accountSid || !authToken) {
    throw new Error("Twilio credentials not configured")
  }
  
  return new Twilio(accountSid, authToken)
}

export async function sendOrderNotification(orderData: OrderData, orderId: string) {
    console.log("Preparing SMS notification for order:", orderId)
    console.log("Order data:", JSON.stringify(orderData, null, 2))
 

  try {
    const twilio = await getTwilioClient()
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
    const recipientPhoneNumber = process.env.NOTIFICATION_PHONE_NUMBER
    
    if (!twilioPhoneNumber || !recipientPhoneNumber) {
      console.warn("Twilio phone numbers not configured")
      return { success: false, message: "Twilio phone numbers not configured" }
    }
    
const message = `🆕 Order!\n\n👤 ${orderData.customer.name}\n📞 ${orderData.customer.phone}\n🛒 ${orderData.items.map((item: OrderItem) => `${item.name} x${item.quantity}`).join(', ')}`

// Check if message exceeds 160 characters and truncate if needed
let finalMessage = message
if (message.length > 160) {
  // Truncate items list to fit within 160 characters
  const baseMessage = `🆕 Order!\n\n👤 ${orderData.customer.name}\n📞 ${orderData.customer.phone}\n🛒 `
  const availableChars = 150 - baseMessage.length - 3 // Reserve 3 chars for "..." and potential truncation
  
  let itemsText = orderData.items.map((item: OrderItem) => `${item.name} x${item.quantity}`).join(', ')
  if (itemsText.length > availableChars) {
    itemsText = itemsText.substring(0, availableChars) + "..."
  }
  
  finalMessage = baseMessage + itemsText
}

console.log("Sending SMS with message:", finalMessage)




     const twilioResponse = await twilio.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: recipientPhoneNumber
    })

    console.log("Twilio response:", twilioResponse.sid)
    console.log("SMS notification sent successfully")
    return { success: true, message: "SMS notification sent successfully" }
  } catch (error) {
    console.error("Failed to send SMS notification:", error)
    return { success: false, message: "Failed to send SMS notification", error }
  }
}
