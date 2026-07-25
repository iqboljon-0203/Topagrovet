import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    // Supabase bepul tarifi 7 kunlik faoliyatsizlikdan so'ng bazani pauza qilmasligi uchun
    // Vercel Cron orqali har kuni ushbu API ga murojaat qilinadi va bitta so'rov yuboriladi.
    const { data, error } = await supabase.from('products').select('id').limit(1);
    
    if (error) {
      console.error('Keepalive xatosi:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Supabase bazasi faol saqlanmoqda',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
