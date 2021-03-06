import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById('root')
);


