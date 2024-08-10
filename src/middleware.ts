import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Dictionary
import { getCanonicalAlternate, getClientDefaultLocale, getServerLocales } from '@dictionary';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = Object.values(getServerLocales()).some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    const newHeaders = request.headers;

    if (pathnameHasLocale) {
        const splittedPathName = pathname.split('/');

        newHeaders.append('locale', splittedPathName[1]);
    } else {
        newHeaders.append('locale', getClientDefaultLocale());
    }

    if (pathnameHasLocale) {
        return NextResponse.rewrite(request.nextUrl, {
            headers: newHeaders,
        });
    }

    if (!pathname.match('/((?!api|static|.*\\..*|_next).*)')) {
        return;
    }

    request.nextUrl.pathname = `/${getCanonicalAlternate()}${pathname}`;

    return NextResponse.redirect(request.nextUrl, {
        headers: newHeaders,
    });
}

export const config = {
    matcher: '/((?!api|static|_next).*)',
};
