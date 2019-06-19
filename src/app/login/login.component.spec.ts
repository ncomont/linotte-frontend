import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';

import { AppState } from '../../shared/reducers';
import { reducers, metaReducers } from '../../shared/reducers';
import { Auth } from '../../models';
import * as user from '../../shared/actions/user.actions';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let store: Store<AppState>;
	let spy: any;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [LoginComponent],
				imports: [
					FormsModule,
					StoreModule.forRoot(reducers, {
						metaReducers,
					}),
				],
			}).compileComponents();

			store = TestBed.get(Store);
			spy = spyOn(store, 'dispatch').and.callThrough();
		}),
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('shoud render username input', () => {
		const compiled = fixture.debugElement.nativeElement;
		const username = compiled.querySelector('#username');
		expect(username).toBeTruthy();
		expect(username.type).toBe('text');
	});

	it('shoud render password input', () => {
		const compiled = fixture.debugElement.nativeElement;
		const password = compiled.querySelector('#password');
		expect(password).toBeTruthy();
		expect(password.type).toBe('password');
	});

	it('shoud render submit button', () => {
		const compiled = fixture.debugElement.nativeElement;
		const input = compiled.querySelector('button[type="submit"]');
		expect(input).toBeTruthy();
	});

	it('should dispatch login action', () => {
		const compiled = fixture.debugElement.nativeElement;
		compiled.querySelector('button[type="submit"]').click();

		expect(store.dispatch).toHaveBeenCalledWith(new user.LoginAction(new Auth()));
	});
});
