import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import { ContactPage, HomePage, PostListPage, PostPage, ProjectPage, StatusPage } from './pages';

//Utils
import { HttpStatusCode } from './utils/enums';

//Types
import { Lang } from './utils/interfaces';

//Langs
import Langs from './langs';

//Context
import { LangContext } from './context';
import { Navbar, Socials } from './components';

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
                <Socials />
                <Routes>
                    <Route path='/'>
                        <Route index element={<HomePage />} />
                        <Route path='contact' element={<ContactPage />} />
                        <Route path='posts' element={<PostListPage />}>
                            <Route path=':id' element={<PostPage />} />
                        </Route>
                        <Route path='projects' element={<ProjectPage />} />
                        <Route
                            path='*'
                            element={<StatusPage httpStatusCode={HttpStatusCode.NOT_FOUND} />}
                        />
                    </Route>
                </Routes>
            </Router>
        </LangContext.Provider>
    );
};

export default App;
