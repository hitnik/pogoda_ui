import SET_CODE_CONFIRM_URL from '../actions/setCodeConfirmURL';

function setCodeConfirmURL (value) {
    return {
		type: SET_CODE_CONFIRM_URL,
		codeConfirmURL: value
	};
}

export default setCodeConfirmURL;