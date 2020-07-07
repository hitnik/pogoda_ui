import SUBSCRIBE from '../actions/subscribe';
import UNSUBSCRIBE from '../actions/unsubscribe';
import initialState from '../initialState';

export default function isSubscribe(state=initialState.isSubscribe, action) {
    switch(action.type) {
        case SUBSCRIBE: return action.isSubscribe;
        case UNSUBSCRIBE: return action.isSubscribe;  
        
        default: return state;
    }
}