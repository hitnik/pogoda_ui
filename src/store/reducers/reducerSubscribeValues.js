import SET_SUBSCRIBE_VALUES_EMAIL from '../actions/setSubscribeValuesEmail';
import initialState from '../initialState';

export default function subscribeValues(state=initialState.codeConfirmURL, action) {
    switch(action.type) {
        case SET_SUBSCRIBE_VALUES_EMAIL: return {
            value: action.codeConfirmURL
        };
        
        default: return state;
    }
}