import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Utils
import { HttpStatusCode } from './utils/enums';

// Types
import { Lang } from './utils/interfaces';

// Langs
import Langs from './langs';

// Context
import { LangContext } from './context';

// Pages
import { HomePage, PostPage, StatusPage } from './pages';

// Components
import { Footer, Navbar } from './components';

const App = () => {
    const [selectedLang, setSelectedLang] = React.useState<Lang>(Langs['en-us']);

    const updateSelectedLang = (langAbbreviation: keyof typeof Langs) => {
        if (!Langs[langAbbreviation]) return;

        setSelectedLang({ ...Langs[langAbbreviation] });
    };

    return (
        <LangContext.Provider value={[selectedLang, updateSelectedLang]}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/'>
                        <Route index element={<HomePage />} />
                        <Route path='post/:id' element={<PostPage />} />
                        <Route
                            path='*'
                            element={<StatusPage httpStatusCode={HttpStatusCode.NOT_FOUND} />}
                        />
                    </Route>
                </Routes>
                <Footer />
            </Router>
        </LangContext.Provider>
    );
};

export default App;
