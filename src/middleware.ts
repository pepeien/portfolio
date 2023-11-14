import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en-us', 'ja-jp', 'pt-br'];

function getLocale(request: NextRequest): string {
    return locales[0];
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};
