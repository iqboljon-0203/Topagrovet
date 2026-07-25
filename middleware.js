import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    // API, next static fayllari va rasmlarni e'tiborsiz qoldirish
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Agar domen "admin." bilan boshlansa (masalan: admin.sayt.uz, admin.localhost:3000)
  if (hostname.startsWith('admin.')) {
    // Agar foydalanuvchi asosiy sahifaga kirgan bo'lsa (admin.sayt.uz/)
    // uni jimgina /admin manziliga rewrite (qayta yozish) qilamiz
    if (!url.pathname.startsWith('/admin')) {
      return NextResponse.rewrite(new URL(`/admin${url.pathname}`, req.url));
    }
  }

  return NextResponse.next();
}
