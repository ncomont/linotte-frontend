import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/reducers';

import { Auth } from '../../models';
import * as user from '../../shared/actions/user.actions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	model = new Auth();

	constructor(private store: Store<AppState>) {}

	onSubmit() {
		this.store.dispatch(new user.LoginAction(this.model));
	}

	ngOnInit() {}
}
