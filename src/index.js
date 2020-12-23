import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import "semantic-ui-css/semantic.min.css";
import './styles/App.css';
import { HashRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import warnings from './store/slices/warningsSlice';
import rootSaga from './sagas/rootSaga';
import { combineReducers } from 'redux';
import isSubscribeSliceReducer from './store/slices/isSubscribe';
import subFormSliceReducer from './store/slices/subForm';
import codeData from './store/slices/codeData';
import forumsSlice from './store/slices/forumsSlice';
import weatherWSSlice from './store/slices/weatherSocketSlice';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import {weatherSocketMiddleware } from './store/middleware/weatherSocketMiddleware';
import { ConnectedRouter } from 'connected-react-router';
import WebSocketConnection from './components/wrappers/websocketConnector';
import history from './components/main/history';


const rootReducer = (history) => combineReducers({
  isSubscribe: isSubscribeSliceReducer,
  subForm : subFormSliceReducer,
  codeData: codeData,
  warnings:warnings,
  forumsSlice: forumsSlice,
  weatherSocket: weatherWSSlice,
  router : connectRouter(history)
});

const weatherWsHost = PRODUCTION ?  new URL('/ws/weather', WEATHER_WS_HOST_PROD) : new URL('/ws/weather', WEATHER_WS_HOST_DEV);


const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), 
                    sagaMiddleware, 
                    routerMiddleware(history),
                    weatherSocketMiddleware(weatherWsHost),
]

const store = configureStore({
  reducer:rootReducer(history),
  middleware:middleware
});

sagaMiddleware.run(rootSaga);

const Root = ({ store }) => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <WebSocketConnection>
          <Router>
              <App />
          </Router>
        </WebSocketConnection>
        </ConnectedRouter>
    </Provider>
  )  

ReactDOM.render((<Root store={store}/>), document.getElementById("root"));


export default store;