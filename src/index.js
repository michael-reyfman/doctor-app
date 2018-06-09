import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import App from './App.jsx';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import authReducer from './reducers/auth';
import hospitalReducer from './reducers/hospital';

const reducer = combineReducers({
	auth: authReducer,
	hospital: hospitalReducer,
});

const reduxStore = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={reduxStore}>
		<BrowserRouter>
			<Route path='/' component={App} />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
