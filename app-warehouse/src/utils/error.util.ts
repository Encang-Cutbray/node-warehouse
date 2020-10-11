export default class Exception extends Error {
	constructor(errorName: string, message: string, stack: string) {
		super(errorName)
		this.name = errorName;
		this.message = message;
		this.stack = stack;
	}
}
