import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { JobReport, JobResult, JobResultState, JobReportStatistics } from '../../models';
import { AppState } from '../../shared/reducers';
import * as report from '../../shared/actions/job-report.actions';

@Component({
	selector: 'app-job-report',
	templateUrl: './job-report.component.html',
	styleUrls: ['./job-report.component.scss'],
})
export class JobReportComponent implements OnInit {
	private report$: Observable<JobReport>;
	private page$: Observable<JobResult[]>;
	private stats$: Observable<JobReportStatistics>;
	private conflict: JobResult;

	constructor(private route: ActivatedRoute, private store: Store<AppState>) {
		this.report$ = this.store.select(s => s.report.report);
		this.stats$ = this.store.select(s => s.report.statistics);
		this.page$ = this.store.select(s => s.report.results);
	}

	ngOnInit() {
		// FIXME: unsub
		this.route.params.subscribe(params => {
			this.store.dispatch(new report.InitializeAction(params.id));
		});
	}

	edit(conflict: JobResult) {
		this.store.dispatch(new report.SelectConflictAction(conflict));
	}

	onChangeState = (state: JobResultState) =>
		this.store.dispatch(new report.ChangeStateFilterAction(state));
}
