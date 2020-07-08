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
					isSubscribe: state.isSubscribe,
					subForm: state.subForm
				};
			}
		}


		default: return undefined;
	}
}

export default mapStateToProps;