import SUBSCRIBE from '../actions';

function subscribe () {
    return {
		type: SUBSCRIBE,
		isSubscribe: true
	};
}

export default subscribe;