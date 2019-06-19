import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
	Router,
	RouterStateSnapshot,
	ActivatedRoute,
	ActivatedRouteSnapshot,
} from '@angular/router';

import { Actions, Effect } from '@ngrx/effects';

import { AppSettings } from '../app.settings';

import * as user from '../actions/user.actions';
import { User } from '../../models';
import { UserService } from '../services';

@Injectable()
export class UserEffects {
	@Effect()
	login$ = this.actions
		.ofType(user.LOGIN)
		.map((action: user.LoginAction) => action.payload)
		.flatMap(p => {
			return this.service
				.login(p)
				.map(res => {
					localStorage.setItem(AppSettings.LS_TOKEN_KEY, JSON.stringify(res));
					return new user.LoginSuccessAction(res);
				})
				.catch(error => Observable.of(new user.LoginFailureAction({ error: error })));
		});

	@Effect({ dispatch: false })
	loginSuccess$ = this.actions
		.ofType(user.LOGIN_SUCCESS)
		.map((action: user.LoginSuccessAction) => action.payload)
		.do(p => this.router.navigate([p.redirect || '/']));

	@Effect({ dispatch: false })
	loginRedirect$ = this.actions
		.ofType(user.LOGIN_REDIRECT)
		.map((action: user.LoginRedirectAction) => action.payload)
		.do(p => this.router.navigate(['/connexion'], { queryParams: { redirect: p } }));

	constructor(private router: Router, private actions: Actions, private service: UserService) {}
}
