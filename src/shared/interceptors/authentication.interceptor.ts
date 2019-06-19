import 'rxjs/Rx';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { AppState } from '../reducers';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
	token$: Observable<string>;

	constructor(private store: Store<AppState>) {
		this.token$ = this.store.select(s => s.user.token);
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.token$.flatMap(token => {
			return next.handle(
				req.clone({
					headers: req.headers.set('Authorization', `Bearer ${token}`),
				}),
			);
		});
	}
}
