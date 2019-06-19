import { Action } from '@ngrx/store';

import { Job } from '../../models';

export const LOAD_JOBS = '[JOB] LOAD JOBS';
export const LOAD_JOBS_SUCCESS = '[JOB] LOAD JOBS SUCCESS';
export const LOAD_FAILURE = '[JOB] LOAD FAILURE';
export const START_JOB = '[JOB] START JOB';
export const STATE_CHANGED = '[JOB] STATE CHANGED';

export class LoadJobsAction implements Action {
	readonly type = LOAD_JOBS;
	constructor() {}
}

export class LoadFailureAction implements Action {
	readonly type = LOAD_FAILURE;
	constructor(public payload?: any) {}
}

export class LoadJobsSuccessAction implements Action {
	readonly type = LOAD_JOBS_SUCCESS;
	constructor(public payload: Job[]) {}
}

export class StartJobAction implements Action {
	readonly type = START_JOB;
	constructor(public payload: Job) {}
}

export class StateChangedAction implements Action {
	readonly type = STATE_CHANGED;
	constructor(public payload: Job) {}
}

export type JobActions =
	| LoadJobsAction
	| LoadFailureAction
	| LoadJobsSuccessAction
	| StartJobAction
	| StateChangedAction;
