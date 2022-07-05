import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
// const root = hydrateRoot(rootElement, <App />);

if (rootElement.hasChildNodes()) {
    const root = hydrateRoot(rootElement, <App />);
} else {
    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
}
