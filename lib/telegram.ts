import { OrderData } from "@/lib/types"

interface TelegramMessage {
  chat_id: string
  text: string
  parse_mode?: string
}

export async function sendOrderNotification(orderData: OrderData, orderId: string) {
  console.log("Preparing Telegram notification for order:", orderId)
  console.log("Order data:", JSON.stringify(orderData, null, 2))

  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    
    if (!botToken || !chatId) {
      console.warn("Telegram credentials not configured")
      return { success: false, message: "Telegram credentials not configured" }
    }
    
    // Format the message for Telegram
    const itemsList = orderData.items.map((item) => 
      `• ${item.name} x${item.quantity}`
    ).join('\n')
    
    const message = `
🆕 *New Order Received*

📋 *Order ID:* ${orderId}
👤 *Customer:* ${orderData.customer.name}
📞 *Phone:* ${orderData.customer.phone}
📍 *Address:* ${orderData.customer.address}

🛒 *Items:*
${itemsList}

💰 *Total:* ${orderData.total.toFixed(2)} CEDIS

${orderData.note ? `📝 *Note:* ${orderData.note}` : ''}
    `.trim()
    
    // Send the message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    )
    
    const responseData = await telegramResponse.json()
    
    if (!telegramResponse.ok) {
      throw new Error(`Telegram API error: ${responseData.description}`)
    }
    
    console.log("Telegram notification sent successfully")
    return { success: true, message: "Telegram notification sent successfully" }
  } catch (error) {
    console.error("Failed to send Telegram notification:", error)
    return { 
      success: false, 
      message: "Failed to send Telegram notification", 
      error 
    }
  }
}
