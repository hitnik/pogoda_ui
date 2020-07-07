import SET_CODE_CONFIRM_URL from '../actions/setCodeConfirmURL';
import initialState from '../initialState';

export default function codeConfirmURL(state=initialState.codeConfirmURL, action) {
    switch(action.type) {
        case SET_CODE_CONFIRM_URL: return {value: action.codeConfirmURL};
        
        default: return state;
    }
}