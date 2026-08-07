import { NextResponse } from 'next/server';


export async function POST(request) {
  try {
    const body = await request.json();
  console.log('🛒 Order received:', body);
    const { type, name, phone, items, total, productName, productId, message } = body;

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    let messageText = '';

    if (type === 'quick_order') {
      messageText = `⚡️ <b>Yangi tezkor buyurtma!</b>\n\n`;
      messageText += `👤 <b>Mijoz:</b> ${name}\n`;
      messageText += `📞 <b>Telefon:</b> ${phone}\n`;
      messageText += `📦 <b>Mahsulot:</b> ${productName}\n`;
    } else if (type === 'cart') {
      messageText = `🛒 <b>Yangi savatcha buyurtmasi!</b>\n\n`;
      messageText += `👤 <b>Mijoz:</b> ${name}\n`;
      messageText += `📞 <b>Telefon:</b> ${phone}\n\n`;
      messageText += `🛍 <b>Mahsulotlar:</b>\n`;
      items.forEach((item, index) => {
        messageText += `${index + 1}. ${item.name} ${item.volume ? `(${item.volume})` : ''} - ${item.quantity} ta x ${item.price} so'm\n`;
      });
      messageText += `\n💰 <b>Jami:</b> ${total} so'm\n`;
    } else if (type === 'contact_message') {
      messageText = `📩 <b>Yangi xabar (Aloqa bo'limidan)!</b>\n\n`;
      messageText += `👤 <b>Ism:</b> ${name}\n`;
      messageText += `📞 <b>Telefon:</b> ${phone}\n`;
      messageText += `💬 <b>Xabar:</b> ${message}\n`;
    }

    // Attempt to send to Telegram if tokens are present
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const response = await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('❌ Failed to send Telegram message:', errText);
        // Return 200 anyway so UI doesn't break if TG fails, but log it
      } else {
        console.log('✅ Telegram message sent successfully');
      }
    } else {
      console.warn('⚠️ Telegram request skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in .env.local');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
