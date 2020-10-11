import moment from 'moment'
export function dateNow() {
	var myDate = new Date();
	return moment(myDate).format("YYYY-MM-DD HH:mm:ss")
}
