import { Action } from '@ngrx/store';

import { Taxon, JobReport, JobReportStatistics, JobResult, JobResultState } from '../../models';

export const INITIALIZE = '[JOB REPORT] INITIALIZE';
export const LOAD_REPORT = '[JOB REPORT] LOAD REPORT';
export const LOAD_STATISTICS = '[JOB REPORT] LOAD STATISTICS';
export const LOAD_REPORT_SUCCESS = '[JOB REPORT] LOAD REPORT SUCCESS';
export const LOAD_STATISTICS_SUCCESS = '[JOB REPORT] LOAD STATISTICS SUCCESS';
export const LOAD_RESULTS = '[JOB REPORT] LOAD RESULTS';
export const CHANGE_STATE_FILTER = '[JOB REPORT] CHANGE STATE FILTER';
export const LOAD_RESULTS_SUCCESS = '[JOB REPORT] LOAD RESULTS SUCCESS';
export const LOAD_FAILURE = '[JOB REPORT] LOAD FAILURE';
export const SELECT_CONFLICT = '[JOB REPORT] SELECT CONFLICT';
export const REFRESH = '[JOB REPORT] REFRESH';
export const RESOLVE = '[JOB REPORT] RESOLVE';
export const RESOLVE_SUCCESS = '[JOB REPORT] RESOLVE_SUCCESS';

export class InitializeAction implements Action {
	readonly type = INITIALIZE;
	constructor(public payload: number) {}
}

export class LoadReportAction implements Action {
	readonly type = LOAD_REPORT;
	constructor(public payload: number) {}
}

export class LoadStatisticsAction implements Action {
	readonly type = LOAD_STATISTICS;
	constructor() {}
}

export class LoadResultsAction implements Action {
	readonly type = LOAD_RESULTS;
	constructor() {}
}

export class LoadFailureAction implements Action {
	readonly type = LOAD_FAILURE;
	constructor(public payload: any) {}
}

export class LoadReportSuccessAction implements Action {
	readonly type = LOAD_REPORT_SUCCESS;
	constructor(public payload: JobReport) {}
}

export class LoadStatisticsSuccessAction implements Action {
	readonly type = LOAD_STATISTICS_SUCCESS;
	constructor(public payload: JobReportStatistics) {}
}

export class LoadResultsSuccessAction implements Action {
	readonly type = LOAD_RESULTS_SUCCESS;
	constructor(public payload: JobResult[]) {}
}

export class ChangeStateFilterAction implements Action {
	readonly type = CHANGE_STATE_FILTER;
	constructor(public payload: JobResultState) {}
}

export class SelectConflictAction implements Action {
	readonly type = SELECT_CONFLICT;
	constructor(public payload?: JobResult) {}
}

export class RefreshAction implements Action {
	readonly type = REFRESH;
	constructor() {}
}

export class ResolveAction implements Action {
	readonly type = RESOLVE;
	constructor(public payload: Taxon) {}
}

export class ResolveSuccessAction implements Action {
	readonly type = RESOLVE_SUCCESS;
	constructor(public payload: JobResult) {}
}

export type JobReportActions =
	| InitializeAction
	| LoadReportAction
	| LoadStatisticsAction
	| LoadResultsAction
	| ChangeStateFilterAction
	| LoadReportSuccessAction
	| LoadResultsSuccessAction
	| LoadFailureAction
	| LoadStatisticsSuccessAction
	| SelectConflictAction
	| RefreshAction
	| ResolveAction
	| ResolveSuccessAction;
