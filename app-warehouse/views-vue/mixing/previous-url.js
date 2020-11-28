export default {
	methods: {
		getPreviousUrl(e) {
			return localStorage.getItem("previousUrl") || document.referrer;
		},
		redirectPreviousUrl() {
			let getPreviousUrl = localStorage.getItem("previousUrl");
			window.location.href = getPreviousUrl || document.referrer;
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
