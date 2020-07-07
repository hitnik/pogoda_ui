function mapStateToProps(component) {
	switch (component) {
		case "SubscribeContainer": {
			return function (state) {
				return {
					isSubscribe: state.isSubscribe
				};
			}
		}
		case "SegmentForms": {
			return function (state) {
				return {
					isSubscribe: state.isSubscribe
				};
			}
		}
		case 'CodeForm':{
			return function (state) {
				return {
					isSubscribe: state.isSubscribe,
					codeConfirmURL: state.codeConfirmURL
				}
			}
		}

		default: return undefined;
	}
}

export default mapStateToProps;