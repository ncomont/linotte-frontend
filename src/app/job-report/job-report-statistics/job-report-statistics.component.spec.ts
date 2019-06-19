import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReportStatisticsComponent } from './job-report-statistics.component';

describe('JobReportStatisticsComponent', () => {
	let component: JobReportStatisticsComponent;
	let fixture: ComponentFixture<JobReportStatisticsComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [JobReportStatisticsComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(JobReportStatisticsComponent);
			component = fixture.componentInstance;

			spyOn(component.changeState, 'emit');

			fixture.detectChanges();
		}),
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit resolved state filter event', () => {
		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('#resolved-filter').click();

		expect(component.changeState.emit).toHaveBeenCalledWith('RESOLVED');
	});

	it('should emit found state filter event', () => {
		const compiled = fixture.debugElement.nativeElement;
		compiled.querySelector('#found-filter').click();

		expect(component.changeState.emit).toHaveBeenCalledWith('FOUND');
	});

	it('should emit not found state filter event', () => {
		const compiled = fixture.debugElement.nativeElement;
		compiled.querySelector('#not-found-filter').click();

		expect(component.changeState.emit).toHaveBeenCalledWith('NOT_FOUND');
	});
});
