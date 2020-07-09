import { combineReducers } from 'redux';


import subForm from './reducerSubForm'
import isSubscribeSliceReducer from '../slices/isSubscribe'


const rootReducer = combineReducers({
    isSubscribe: isSubscribeSliceReducer,
    subForm
});

export default rootReducer;
