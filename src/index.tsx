import React from 'react';
import ReactDOM from 'react-dom';

//Components
import { Home } from './pages';

//Styles
import './assets/styles/main.scss';

ReactDOM.render(
	<React.StrictMode>
		<main>
			<Home />
		</main>
	</React.StrictMode>,
	document.getElementById('root'),
);
