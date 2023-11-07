import React from 'react';

// Types
import { Lang } from '../utils/interfaces';

// Lang
import Langs from '../langs';

const LangContext = React.createContext<[Lang, (nextLang: keyof typeof Langs) => void]>([
    Langs['en-us'],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
]);

export default LangContext;
