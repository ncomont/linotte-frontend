import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';

import { AppState } from '../reducers';
import * as user from '../actions/user.actions';
import { AppSettings } from '../app.settings';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
	constructor(private store: Store<AppState>) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).do(
			event => next.handle(request),
			event => {
				if (event instanceof HttpErrorResponse) {
					if (event.status === 401) {
						localStorage.removeItem(AppSettings.LS_TOKEN_KEY);
						this.store.dispatch(new user.LoginRedirectAction(''));
					}
				}
			},
		);
	}
}
