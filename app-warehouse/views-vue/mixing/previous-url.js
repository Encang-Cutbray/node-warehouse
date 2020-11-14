export default {
	methods: {
		getPreviousUrl() {
			return window.localStorage.getItem("previousUrl");
		},
		setPreviousUrl(url) {
			console.log(__INITIAL_STATE__);
			this.removePreviousUrl()
			localStorage.setItem("previousUrl", url);
		},
		removePreviousUrl() {
			localStorage.removeItem("previousUrl");
		}
	},
}
