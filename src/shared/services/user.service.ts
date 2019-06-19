import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../app.settings';
import { AuthenticationService } from './authentication.service';

import { User, Auth } from '../../models';

@Injectable()
export class UserService {
	constructor(private http: HttpClient) {}

	login(auth: Auth): Observable<User> {
		return this.http.post<any>(AppSettings.LOGIN_ENDPOINT, auth).map(res => {
			const result = new User();
			if (res.success && res.token) {
				result.username = auth.username;
				result.token = res.token;
			}
			return result;
		});
	}
}
