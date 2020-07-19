import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "semantic-ui-css/semantic.min.css";
import { HashRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { createHashHistory } from 'history';

import isSubscribeSliceReducer from './store/slices/isSubscribe'
import subFormSliceReducer from './store/slices/subForm'




const rootReducer= (history) => combineReducers({
  router: connectRouter(history),
  isSubscribe: isSubscribeSliceReducer,
  subForm : subFormSliceReducer,
  
});

const history = createHashHistory();

const middleware = [...getDefaultMiddleware(), thunk, routerMiddleware(history)]

const store = configureStore({
  reducer:rootReducer(history),
  middleware:middleware
});


const Root = ({ store }) => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router>
            <App />
        </Router>
      </ConnectedRouter>
    </Provider>
  )

ReactDOM.render((<Root store={store}/>), document.getElementById("root"));

export default store;