import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { KeysPipe } from '../../shared/pipes';
import { reducers, metaReducers } from '../../shared/reducers';
import * as components from '../';

describe('JobReportComponent', () => {
	let component: components.JobReportComponent;
	let fixture: ComponentFixture<components.JobReportComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					components.JobReportComponent,
					components.JobReportStatisticsComponent,
					KeysPipe,
				],
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
		fixture = TestBed.createComponent(components.JobReportComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render stats component', () => {
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('app-job-report-statistics')).toBeTruthy();
	});
});
