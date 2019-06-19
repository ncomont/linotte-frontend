import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppSettings } from './app.settings';

import { AppState } from './reducers';
import * as user from './actions/user.actions';

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(private store: Store<AppState>) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.store
			.select(s => s.user.authed)
			.map(authed => {
				if (!authed) {
					const session = localStorage.getItem(AppSettings.LS_TOKEN_KEY);

					if (session) {
						this.store.dispatch(
							new user.LoginSuccessAction({
								...JSON.parse(session),
								redirect: state.url,
							}),
						);
					} else {
						this.store.dispatch(new user.LoginRedirectAction(state.url));
					}
					return false;
				}
				return true;
			})
			.take(1);
	}
}
