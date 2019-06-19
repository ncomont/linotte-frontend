export class Auth {
	username: string;
	password: string;

	constructor(username: string = '', password: string = '') {
		this.username = username;
		this.password = password;
	}
}

export class User {
	id: number;
	username: string;
	token: string;

	public static Parse(json: any): User {
		return new User({
			username: json.username,
			token: json.token,
		});
	}

	public constructor(init?) {
		Object.assign(this, init);
	}
}
