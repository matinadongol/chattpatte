import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import chattpatteStore from './store/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={chattpatteStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
