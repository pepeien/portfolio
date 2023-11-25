'use server-only';

// Types
import { Dictionary } from '@utils/interfaces';

// Servicesd
import { StringServices } from '@utils/services';

const canonical = 'en';

const serverLocales: Dictionary = {
    en: 'en-us',
    ja: 'ja-jp',
    pt: 'pt-br',
};

const clientLocales: Dictionary = {
    'en-us': 'English (US)',
    'pt-br': 'Português (BR)',
    'ja-jp': '日本語',
};

export const getCanonical = () => canonical;

export const getServerDefaultLocale = () => serverLocales[canonical];
export const getServerLocales = () => serverLocales;

export const getClientDefaultLocale = () => clientLocales[getServerDefaultLocale()];
export const getClientLocales = () => clientLocales;

export const getCanonicalAlternate = (path = '') => {
    if (path.trim().length === 0) {
        return serverLocales[canonical];
    }

    return `${serverLocales[canonical]}/${path}`;
};

export const getAlternates = (path = '') => {
    const result: { [key: string]: string } = {};

    Object.keys(serverLocales)
        .filter((alternate) => alternate !== canonical)
        .forEach((key) => {
            result[key] = `${serverLocales[key]}${
                StringServices.isStringValid(path) ? `/${path}` : ''
            }`;
        });

    return result;
};

const dictionaries = {
    'en-us': () => import('./dictionaries/en-us.ts').then((module) => module.default as Dictionary),
    'ja-jp': () => import('./dictionaries/ja-jp.ts').then((module) => module.default as Dictionary),
    'pt-br': () => import('./dictionaries/pt-br.ts').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: string) =>
    dictionaries[locale as keyof typeof dictionaries]();
