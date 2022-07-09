import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose,createStore} from "redux";
import {login, user,admin, quiz} from "./Store/reducer";
import 'bootstrap/dist/css/bootstrap.min.css';




//boilerplate for async redux; middleware magic
const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function')
        return action(storeAPI.dispatch, storeAPI.getState)

    next(action)
}
//dev tools line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    login, user, quiz, admin
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(asyncMiddleware)))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

