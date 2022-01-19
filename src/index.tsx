import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import { ArtPage, DevelopmentPage, HomePage, StatusPage } from './pages';

//Utils
import { HttpStatusCode } from './utils/enums';

//Styles
import './assets/styles/main.scss';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path='art' element={<ArtPage />} />
				<Route path='dev' element={<DevelopmentPage />} />
				<Route path='*' element={<StatusPage httpStatusCode={HttpStatusCode.NOT_FOUND} />} />
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
