export default {
	methods: {
		parsePagePermissions(permissionName) {
			let configPermission = this.config || __INITIAL_STATE__.config || null
			let parsePagePermissions = configPermission ? JSON.parse(configPermission.pagePermission || "[]") : []

			if (!parsePagePermissions.length) {
				return false
			}
			let hasPermission = parsePagePermissions.filter(page => page.name.includes(permissionName))
			return hasPermission.length ? true : false
		}
	},
	computed: {
		createPermission() {
			return this.parsePagePermissions('.create')
		},
		readPermission() {
			return this.parsePagePermissions('.read')
		},
		updatePermission() {
			return this.parsePagePermissions('.update')
		},
		deletePermission() {
			return this.parsePagePermissions('.delete')
		},
		importPermission() {
			return this.parsePagePermissions('.import')
		},
		exportPermission() {
			return this.parsePagePermissions('.export')
		},
		printPermission() {
			return this.parsePagePermissions('.print')
		},
		approvePermission() {
			return this.parsePagePermissions('.approve')
		},
		disablePermission() {
			return this.parsePagePermissions('.disable')
		},
		enablePermission() {
			return this.parsePagePermissions('.enable')
		},
	},
}
