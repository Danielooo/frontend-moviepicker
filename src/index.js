import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import App from './App';
import AuthContextProvider from "./context/AuthContext";
import ShortlistContextProvider from "./context/ShortlistContext";
import FavoritesContextProvider from "./context/FavoritesContext";
import MoviesContextProvider from "./context/MoviesContext";

// styles
import './styles/global.css';


const container = document.getElementById('root');

// create a root
const root = ReactDOM.createRoot(container);

//render app to root
root.render(
<Router>
	<AuthContextProvider>
		<FavoritesContextProvider>
			<ShortlistContextProvider>
				<MoviesContextProvider>
					<App/>
				</MoviesContextProvider>
			</ShortlistContextProvider>
		</FavoritesContextProvider>
	</AuthContextProvider>
</Router>
);



