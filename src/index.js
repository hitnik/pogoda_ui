import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "semantic-ui-css/semantic.min.css";
import { HashRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/sagas/rootSaga';
import { combineReducers } from 'redux';
import isSubscribeSliceReducer from './store/slices/isSubscribe';
import subFormSliceReducer from './store/slices/subForm';
import warningsReducer from './store/slices/warnings';
import codeData from './store/slices/codeData';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import { ConnectedRouter } from 'connected-react-router';
import history from './components/main/history';

const rootReducer = (history) => combineReducers({
  isSubscribe: isSubscribeSliceReducer,
  subForm : subFormSliceReducer,
  codeData: codeData,
  warnings: warningsReducer,
  router : connectRouter(history)
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), thunk, sagaMiddleware, routerMiddleware(history)]

const store = configureStore({
  reducer:rootReducer(history),
  middleware:middleware
});

sagaMiddleware.run(rootSaga);

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