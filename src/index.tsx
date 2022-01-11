import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import { StatusPage, PlaceHolderPage } from './pages';

//Utils
import { HttpStatusCode } from './utils/enums';

//Styles
import './assets/styles/main.scss';

ReactDOM.render(
	<React.StrictMode>
		<main>
			<Router>
				<Routes>
					<Route index element={<PlaceHolderPage />} />
					<Route path='*' element={<StatusPage httpStatusCode={HttpStatusCode.NOT_FOUND} redirectUrl='' />} />
				</Routes>
			</Router>
		</main>
	</React.StrictMode>,
	document.getElementById('root'),
);
