import SET_SUBSCRIBE_VALUES_EMAIL from '../actions/setSubscribeValuesEmail';

function setSubscribeValuesEmail (value) {
    return {
		type: SET_SUBSCRIBE_VALUES_EMAIL,
		subscribeValues: {
            email: value
        }
	};
}

export default setSubscribeValuesEmail;