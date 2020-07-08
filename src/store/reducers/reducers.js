import { combineReducers } from 'redux';

import isSubscribe from './reducerSubscribe';
import subForm from './reducerSubForm'


const reducers = combineReducers({
    isSubscribe,
    subForm
});

export default reducers;
