import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { reducers, metaReducers } from '../../shared/reducers';
import { JobListComponent, JobItemStatusComponent, JobItemActionComponent } from '../';

describe('JobListComponent', () => {
	let component: JobListComponent;
	let fixture: ComponentFixture<JobListComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [JobListComponent, JobItemStatusComponent, JobItemActionComponent],
				imports: [
					RouterTestingModule,
					StoreModule.forRoot(reducers, {
						metaReducers,
					}),
				],
			}).compileComponents();
		}),
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(JobListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
