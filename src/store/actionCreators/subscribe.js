import SUBSCRIBE from '../actions/subscribe';

function subscribe () {
    return {
		type: SUBSCRIBE,
		isSubscribe: true
	};
}

export default subscribe;