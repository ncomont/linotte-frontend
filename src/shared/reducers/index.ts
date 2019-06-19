import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { environment } from '../../environments/environment';
import * as taxref from './taxref.reducer';
import * as user from './user.reducer';
import * as job from './job.reducer';
import * as report from './job-report.reducer';

export interface AppState {
	taxref: taxref.State;
	user: user.State;
	job: job.State;
	report: report.State;
}

export const reducers: ActionReducerMap<AppState> = {
	taxref: taxref.reducer,
	user: user.reducer,
	job: job.reducer,
	report: report.reducer,
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
	return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
