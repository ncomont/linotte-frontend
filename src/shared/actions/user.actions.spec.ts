import * as user from '../actions/user.actions';
import { User, Auth } from '../../models';

describe('UserActions', () => {
	it('should create a "login" action', () => {
		const mock = new Auth('toto', 'tata');
		const action = new user.LoginAction(mock);
		expect(action.type).toBe(user.LOGIN);
		expect(action.payload).toBe(mock);
	});

	it('should create a "logout" action', () => {
		const action = new user.LogoutAction();
		expect(action.type).toBe(user.LOGOUT);
	});

	it('should create a "login success" action', () => {
		const mock = new User({ id: Math.floor(Math.random() * 1000) });
		const action = new user.LoginSuccessAction(mock);
		expect(action.type).toBe(user.LOGIN_SUCCESS);
		expect(action.payload).toEqual(mock);
	});

	it('should create a "login failure" action', () => {
		const action = new user.LoginFailureAction({ error: 'error' });
		expect(action.type).toBe(user.LOGIN_FAILURE);
		expect(action.payload).toEqual({ error: 'error' });
	});

	it('should create a "login redirect" action', () => {
		const action = new user.LoginRedirectAction('route');
		expect(action.type).toBe(user.LOGIN_REDIRECT);
		expect(action.payload).toEqual('route');
	});
});
