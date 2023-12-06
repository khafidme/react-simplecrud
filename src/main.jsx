import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

//Import BrowserRouter from react router dom
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/** Add React Browser Router */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
