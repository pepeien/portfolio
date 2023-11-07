import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import { HomePage, StatusPage } from './pages';

//Utils
import { HttpStatusCode } from './utils/enums';

//Types
import { Lang } from './utils/interfaces';

//Langs
import Langs from './langs';

//Context
import { LangContext } from './context';

const App = () => {
    const [selectedLang, setSelectedLang] = React.useState<Lang>(Langs['en-us']);

    const updateSelectedLang = (langAbbreviation: keyof typeof Langs) => {
        if (!Langs[langAbbreviation]) return;

        setSelectedLang({ ...Langs[langAbbreviation] });
    };

    return (
        <LangContext.Provider value={[selectedLang, updateSelectedLang]}>
            <Router>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route
                        path='*'
                        element={<StatusPage httpStatusCode={HttpStatusCode.NOT_FOUND} />}
                    />
                </Routes>
            </Router>
        </LangContext.Provider>
    );
};

export default App;
