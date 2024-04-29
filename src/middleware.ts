import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Dictionary
import { getCanonicalAlternate, getServerLocales } from '@dictionary';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = Object.values(getServerLocales()).some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (pathnameHasLocale) return;

    request.nextUrl.pathname = `/${getCanonicalAlternate()}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};
