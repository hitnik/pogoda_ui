import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { combineReducers } from 'redux';

import isSubscribeSliceReducer from './slices/isSubscribe'
import subFormSliceReducer from './slices/subForm'


const rootReducer = combineReducers({
    routing: routerReducer,
    isSubscribe: isSubscribeSliceReducer,
    subForm : subFormSliceReducer,
    
});

const middleware = [...getDefaultMiddleware(), thunk, routerMiddleware]

const store = configureStore({
    reducer:rootReducer,
    middleware:middleware
});

export default store;