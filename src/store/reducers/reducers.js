import { combineReducers } from 'redux';

import isSubscribeSliceReducer from '../slices/isSubscribe'
import subFormSliceReducer from '../slices/subForm'


const rootReducer = combineReducers({
    isSubscribe: isSubscribeSliceReducer,
    subForm : subFormSliceReducer,
});

export default rootReducer;
