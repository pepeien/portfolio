import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Dictionary
import {
    getCanonicalAlternate,
    getClientDefaultLocale,
    getServerLocales,
    LOCALE_HEADER_KEY,
} from '@dictionary';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const pathnameHasLocale = Object.values(getServerLocales()).some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    const newHeaders = request.headers;

    if (pathnameHasLocale) {
        const splittedPathName = pathname.split('/');

        newHeaders.append(LOCALE_HEADER_KEY, splittedPathName[1]);
    } else {
        newHeaders.append(LOCALE_HEADER_KEY, getClientDefaultLocale());
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
