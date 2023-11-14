'use server-only';

// Types
import { Dictionary, PersonalDictionary } from '@utils/interfaces';

const alternates = {
    'en-US': '/en-us',
    'ja-JP': '/ja-jp',
    'pt-BR': '/pt-br',
};

export const getAlternates = () => alternates;

const locales = {
    'en-us': 'English (US)',
    'pt-br': 'Português (BR)',
    'ja-jp': '日本語',
} as Dictionary;

export const getLocales = () => locales;

const dictionaries = {
    'en-us': () => import('./dictionaries/en-us.ts').then((module) => module.default as Dictionary),
    'ja-jp': () => import('./dictionaries/ja-jp.ts').then((module) => module.default as Dictionary),
    'pt-br': () => import('./dictionaries/pt-br.ts').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: string) =>
    dictionaries[locale as keyof typeof dictionaries]();

const personalDictionaries = {
    'en-us': () =>
        import('./dictionaries/personal/en-us.ts').then(
            (module) => module.default as PersonalDictionary,
        ),
    'ja-jp': () =>
        import('./dictionaries/personal/ja-jp.ts').then(
            (module) => module.default as PersonalDictionary,
        ),
    'pt-br': () =>
        import('./dictionaries/personal/pt-br.ts').then(
            (module) => module.default as PersonalDictionary,
        ),
};

export const getPersonalDictionary = async (locale: string) =>
    personalDictionaries[locale as keyof typeof personalDictionaries]();
