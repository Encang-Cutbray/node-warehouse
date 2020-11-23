export default {
	methods: {
		showNotification(message, status = true) {
			M.toast({
				html: `${message}`,
				classes: status ? "light-blue" : "light-red"
			});
		},
		getCsrfToken() {
			return __INITIAL_STATE__.config ? __INITIAL_STATE__.config.csrfToken : null;
		},

	},
}
