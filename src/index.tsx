import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import { HomePage, StatusPage } from './pages';

//Utils
import { HttpStatusCode } from './utils/enums';

//Styles
import './assets/styles/main.scss';

const root = createRoot(window.document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path='*' element={<StatusPage httpStatusCode={HttpStatusCode.NOT_FOUND} />} />
			</Routes>
		</Router>
	</React.StrictMode>,
);
