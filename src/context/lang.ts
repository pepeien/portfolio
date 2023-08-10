import React from 'react';

// Types
import { Lang } from '../utils/interfaces';

// Lang
import Langs from '../langs';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const LangContext = React.createContext<[Lang, (nextLang: keyof typeof Langs) => void]>([
    Langs.enUs,
    () => {},
]);

export default LangContext;
