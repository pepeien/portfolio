import React from 'react';
import { createRoot } from 'react-dom/client';

//Pages
import App from './App';

//Styles
import './assets/styles/main.scss';

const root = createRoot(window.document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
