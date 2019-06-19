import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { AppState } from '../../shared/reducers';

declare var $: any;

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	private authed$: Observable<boolean>;
	private username$: Observable<string>;

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		$('.dropdown-toggle').dropdown();

		// const auth: Auth = {
		// 	username: 'nicolasc',
		// 	password: 's87kX2bdMH72',
		// };

		this.authed$ = this.store.select(s => s.user.authed);
		this.username$ = this.store.select(s => s.user.username);
	}
}
