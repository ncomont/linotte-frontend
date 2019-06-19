import 'rxjs/Rx';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as job from '../actions/job.actions';
import { JobService } from '../services';
import { AppState } from '../reducers';

@Injectable()
export class JobEffects {
	@Effect()
	loadJobs$ = this.actions.ofType(job.LOAD_JOBS).flatMap(() =>
		this.service
			.getAll()
			.map(jobs => new job.LoadJobsSuccessAction(jobs))
			.catch(e => Observable.of(new job.LoadFailureAction(e))),
	);

	@Effect()
	startJob$ = this.actions
		.ofType(job.START_JOB)
		.map((action: job.StartJobAction) => action.payload)
		.flatMap(p =>
			this.service
				.start(p)
				.map(j => new job.StateChangedAction(j))
				.catch(e => Observable.of(new job.LoadFailureAction(e))),
		);

	constructor(
		private actions: Actions,
		private store: Store<AppState>,
		private service: JobService,
	) {}
}
