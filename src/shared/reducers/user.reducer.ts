import * as user from '../actions/user.actions';

export interface State {
	username: string;
	authed: boolean;
	token: string;
}

const initialState: State = {
	username: '',
	authed: false,
	token: '',
};

export function reducer(state = initialState, action: user.UserActions): State {
	switch (action.type) {
		case user.LOGIN_SUCCESS: {
			return {
				...state,
				username: action.payload.username,
				authed: true,
				token: action.payload.token,
			};
		}
		case user.LOGIN_FAILURE:
		case user.LOGOUT:
			return initialState;
		default:
			return state;
	}
}
