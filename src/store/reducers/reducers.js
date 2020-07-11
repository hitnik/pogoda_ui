import { combineReducers } from 'redux';

import isSubscribeSliceReducer from '../slices/isSubscribe'
import subFormSliceReducer from '../slices/subForm'
import errorsReducer from '../slices/errors';


const rootReducer = combineReducers({
    isSubscribe: isSubscribeSliceReducer,
    subForm : subFormSliceReducer,
    errors: errorsReducer
});

export default rootReducer;
