import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemActionComponent } from './job-item-action.component';
import { Job, JobReport, JobReportStatus, JobStatus } from '../../../models';

describe('JobItemActionComponent', () => {
	let component: JobItemActionComponent;
	let fixture: ComponentFixture<JobItemActionComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [JobItemActionComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(JobItemActionComponent);
			component = fixture.componentInstance;
			component.job = new Job();

			spyOn(component.start, 'emit');
			spyOn(component.open, 'emit');

			fixture.detectChanges();
		}),
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render a "download" button', () => {
		component.job._status = JobReportStatus.PASSED;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('button');
		expect(button.innerText).toBe('Télécharger');
	});

	it('should render a "start" button', () => {
		component.job._status = JobStatus.NEW;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('button').click();
	});

	it('should render a "resolve" button', () => {
		component.job._status = JobStatus.WARNING;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('button');
		expect(button.innerText).toBe('Résoudre');
	});

	it('should render a "delete" button', () => {
		component.job._status = JobStatus.ERROR;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('button');
		expect(button.innerText).toBe('Supprimer');
	});

	it('should raise a "start" event', () => {
		component.job._status = JobStatus.NEW;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		compiled.querySelector('button').click();
		expect(component.start.emit).toHaveBeenCalledWith(component.job);
	});

	it('should raise an "open" event', () => {
		component.job._status = JobStatus.WARNING;
		component.job.reports = [new JobReport()];
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		compiled.querySelector('button').click();
		expect(component.open.emit).toHaveBeenCalledWith(new JobReport());
	});
});
