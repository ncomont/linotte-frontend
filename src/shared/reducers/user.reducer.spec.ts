import * as user from '../actions/user.actions';
import { reducer } from './user.reducer';
import { User } from '../../models';

const initial = {
	username: '',
	authed: false,
	token: '',
};

const mock = new User({
	id: Math.floor(Math.random() * 1000),
	username: 'John',
	token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzd
			WIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9
			lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RM
			HrHDcEfxjoYZgeFONFh7HgQ`,
});

describe('UserReducer', () => {
	it('should handle initial state', () => {
		expect(reducer(undefined, { type: undefined })).toEqual(initial);
	});

	it('should handle LOGIN_SUCCESS', () => {
		expect(reducer(initial, new user.LoginSuccessAction(mock))).toEqual({
			username: mock.username,
			authed: true,
			token: mock.token,
		});
	});

	it('should handle LOGIN_FAILURE', () => {
		expect(reducer(initial, new user.LoginFailureAction())).toEqual(initial);
	});

	it('should handle LOGOUT', () => {
		expect(reducer(initial, new user.LogoutAction())).toEqual(initial);
	});
});
