export default {
	methods: {
		getPreviousUrl(e) {
			return localStorage.getItem("previousUrl") || '/';
		},
		redirectPreviousUrl() {
			let getPreviousUrl = localStorage.getItem("previousUrl");
			window.location.href = getPreviousUrl || '/';
			this.removePreviousUrl()
		},
		setPreviousUrl(url) {
			this.removePreviousUrl()
			localStorage.setItem("previousUrl", url);
		},
		removePreviousUrl() {
			localStorage.removeItem("previousUrl");
		}
	},
}
