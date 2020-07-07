import { combineReducers } from 'redux';

import isSubscribe from './reducerSubscribe';
import codeConfirmURL from './reducerCodeConfirmURL';
const reducers = combineReducers({
    isSubscribe,
    codeConfirmURL
});

export default reducers;
