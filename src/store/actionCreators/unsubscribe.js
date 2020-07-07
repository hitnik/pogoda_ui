import UNSUBSCRIBE from '../actions/unsubscribe';

function unsubscribe () {
    return{
        type: UNSUBSCRIBE,
        isSubscribe: false
    };
}

export default unsubscribe;