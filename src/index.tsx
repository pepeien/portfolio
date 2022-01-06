import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages
import { ErrorPage, HomePage } from './pages';

//Utils
import { HttpStatusCode } from './utils/enums';

//Styles
import './assets/styles/main.scss';

ReactDOM.render(
	<React.StrictMode>
		<main>
			<BrowserRouter>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path='*' element={<ErrorPage httpError={HttpStatusCode.NOT_FOUND} />} />
				</Routes>
			</BrowserRouter>
		</main>
	</React.StrictMode>,
	document.getElementById('root'),
);
