import { Action } from '@ngrx/store';

import { Auth, User } from '../../models';

export const LOGIN = '[USER] LOGIN';
export const LOGOUT = '[USER] LOGOUT';
export const LOGIN_FAILURE = '[USER] LOGIN FAILURE';
export const LOGIN_SUCCESS = '[USER] LOGIN SUCCESS';
export const LOGIN_REDIRECT = '[USER] LOGIN REDIRECT';

export class LoginAction implements Action {
	readonly type = LOGIN;
	constructor(public payload: Auth) {}
}

export class LogoutAction implements Action {
	readonly type = LOGOUT;
}

export class LoginSuccessAction implements Action {
	readonly type = LOGIN_SUCCESS;
	constructor(public payload: any) {}
}

export class LoginFailureAction implements Action {
	readonly type = LOGIN_FAILURE;
	constructor(public payload?: any) {}
}

export class LoginRedirectAction implements Action {
	readonly type = LOGIN_REDIRECT;
	constructor(public payload: string) {}
}

export type UserActions =
	| LoginAction
	| LogoutAction
	| LoginSuccessAction
	| LoginFailureAction
	| LoginRedirectAction;
