import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers/reducers';

const middleware = [...getDefaultMiddleware(), thunk]

const store = configureStore({
    reducer:rootReducer,
    middleware:middleware
});

export default store;