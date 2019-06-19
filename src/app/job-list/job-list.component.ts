import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Job, JobReport } from '../../models';
import { AppState } from '../../shared/reducers';
import * as job from '../../shared/actions/job.actions';

@Component({
	selector: 'app-job-list',
	templateUrl: './job-list.component.html',
	styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit, OnDestroy {
	private jobs$: Observable<Job[]>;
	private refresh: any;

	constructor(private store: Store<AppState>, private router: Router) {
		this.jobs$ = this.store.select(s => s.job.jobs);
	}

	ngOnInit() {
		// FIXME
		this.store.dispatch(new job.LoadJobsAction());
		// this.refresh = setInterval(() => this.store.dispatch(new job.LoadJobsAction()), 10000);
	}

	ngOnDestroy() {
		// FIXME
		clearInterval(this.refresh);
	}

	onStartJob = (j: Job) => this.store.dispatch(new job.StartJobAction(j));
	onOpenReport = (report: JobReport) => this.router.navigate(['/rapport', report.id]);
}
