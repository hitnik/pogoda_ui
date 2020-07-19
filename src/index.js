import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "semantic-ui-css/semantic.min.css";
import { HashRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import isSubscribeSliceReducer from './store/slices/isSubscribe'
import subFormSliceReducer from './store/slices/subForm'

const rootReducer = combineReducers({
  isSubscribe: isSubscribeSliceReducer,
  subForm : subFormSliceReducer,
  
});

const middleware = [...getDefaultMiddleware(), thunk]

const store = configureStore({
  reducer:rootReducer,
  middleware:middleware
});


const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
          <App />
      </Router>
    </Provider>
  )

ReactDOM.render((<Root store={store}/>), document.getElementById("root"));

export default store;