import UNSUBSCRIBE from '../actions';

function unsubscribe () {
    return{
        type: UNSUBSCRIBE,
        isSubscribe: false
    };
}

export default unsubscribe;