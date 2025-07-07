import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './containers/App/App';  // ✅ Use routing App here
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './i18n';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
