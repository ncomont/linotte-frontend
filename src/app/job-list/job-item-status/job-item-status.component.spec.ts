import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemStatusComponent } from './job-item-status.component';
import { Job, JobReportStatus, JobStatus } from '../../../models';

describe('JobItemStatusComponent', () => {
	let component: JobItemStatusComponent;
	let fixture: ComponentFixture<JobItemStatusComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [JobItemStatusComponent],
			}).compileComponents();
		}),
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(JobItemStatusComponent);
		component = fixture.componentInstance;
		component.job = new Job();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render a "ended" badge', () => {
		component.job._status = JobReportStatus.PASSED;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('span');
		expect(button.innerText).toBe('Terminé');
	});

	it('should render a "new" badge', () => {
		component.job._status = JobStatus.NEW;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('span');
		expect(button.innerText).toBe('Nouveau');
	});

	it('should render a "stacked" badge', () => {
		component.job._status = JobStatus.STACKED;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('span');
		expect(button.innerText).toBe('En attente');
	});

	it('should render a "conflicts" badge', () => {
		component.job._status = JobStatus.WARNING;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('span');
		expect(button.innerText).toBe('Conflits');
	});

	it('should render a "error" badge', () => {
		component.job._status = JobStatus.ERROR;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('span');
		expect(button.innerText).toBe('Erreur');
	});

	it('should render a progress bar', () => {
		component.job._status = '66%';
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const bar = compiled.querySelector('div[role="progressbar"]');
		expect(bar).toBeTruthy();
	});
});
