function mapStateToProps(component) {
	switch (component) {
		case "SubscribeContainer": {
			return function (state) {
				return {
					isSubscribe: state.isSubscribe
				};
			}
		}
		
		default: return undefined;
	}
}

export default mapStateToProps;