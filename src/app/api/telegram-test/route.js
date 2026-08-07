import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ error: 'Telegram env not set' }, { status: 500 });
  }
  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(tgUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: '✅ Test message from Topagrovet dev server', parse_mode: 'HTML' })
  });
  const data = await res.json();
  return NextResponse.json({ ok: res.ok, data });
}
