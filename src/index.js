import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from "./context/AuthContext";
import ShortlistContextProvider from "./context/ShortlistContext";

// styles
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Router>
        <AuthContextProvider>
          <ShortlistContextProvider>
            <App/>
          </ShortlistContextProvider>
        </AuthContextProvider>
      </Router>
    </React.StrictMode>
);


