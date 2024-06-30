import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from './redux/store/store.js';
import ContextProvider from './components/context/ContextProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ContextProvider>
);

reportWebVitals();
