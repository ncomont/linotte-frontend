import 'rxjs/Rx';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { JobResultState, JobReport } from '../../models';
import * as report from '../actions/job-report.actions';
import { JobReportService } from '../services';
import { AppState } from '../reducers';

@Injectable()
export class JobReportEffects {
	@Effect()
	loadStatistics$ = this.actions
		.ofType(report.LOAD_STATISTICS)
		.withLatestFrom(this.store)
		.map(([action, state]) => state.report)
		.flatMap(state =>
			this.service
				.getStatisticsByID(state.report.id)
				.map(stats => new report.LoadStatisticsSuccessAction(stats))
				.catch(e => Observable.of(new report.LoadFailureAction(e))),
		);

	@Effect()
	loadReport$ = this.actions
		.ofType(report.LOAD_REPORT)
		.map((action: report.LoadReportAction) => action.payload)
		.flatMap(p =>
			this.service
				.getByID(p)
				.map(stats => new report.LoadReportSuccessAction(stats))
				.catch(e => Observable.of(new report.LoadFailureAction(e))),
		);

	@Effect()
	loadResults$ = this.actions
		.ofType(report.LOAD_RESULTS, report.CHANGE_STATE_FILTER)
		.withLatestFrom(this.store)
		.map(([action, state]) => state.report)
		.switchMap(state =>
			this.service
				.getResultsByState(state.report.id, state.state)
				.map(results => new report.LoadResultsSuccessAction(results))
				.catch(e => Observable.of(new report.LoadFailureAction(e))),
		);

	@Effect()
	initialize$ = this.actions
		.ofType(report.INITIALIZE)
		.map((action: report.InitializeAction) => action.payload)
		.flatMap(p => this.service.getByID(p))
		.flatMap(result => [
			new report.LoadReportSuccessAction(result),
			new report.LoadStatisticsAction(),
			new report.LoadResultsAction(),
		])
		.catch(e => Observable.of(new report.LoadFailureAction(e)));

	@Effect()
	refresh$ = this.actions
		.ofType(report.REFRESH, report.RESOLVE_SUCCESS)
		.flatMap(() => [new report.LoadStatisticsAction(), new report.LoadResultsAction()])
		.catch(e => Observable.of(new report.LoadFailureAction(e)));

	@Effect()
	resolve$ = this.actions
		.ofType(report.RESOLVE)
		.withLatestFrom(this.store)
		.map(([action, state]) => state.report)
		.flatMap(state =>
			this.service
				.resolve(state.conflict)
				.map(result => new report.ResolveSuccessAction(result))
				.catch(e => Observable.of(new report.LoadFailureAction(e))),
		);

	constructor(
		private actions: Actions,
		private store: Store<AppState>,
		private service: JobReportService,
	) {}
}
