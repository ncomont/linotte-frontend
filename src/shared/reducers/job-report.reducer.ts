import * as report from '../actions/job-report.actions';
import { JobReport, JobResult, JobResultState, JobReportStatistics } from '../../models';
import { AppSettings } from '../app.settings';

export interface State {
	loading: boolean;
	results: JobResult[];
	statistics: JobReportStatistics;
	state: JobResultState;
	report: JobReport;
	conflict: JobResult;
}

const initialState: State = {
	loading: false,
	results: null,
	statistics: null,
	state: JobResultState.NOT_FOUND,
	report: null,
	conflict: null,
};

export function reducer(state = initialState, action: report.JobReportActions): State {
	switch (action.type) {
		case report.INITIALIZE: {
			return {
				...initialState,
				loading: true,
			};
		}
		case report.LOAD_STATISTICS: {
			return {
				...state,
				loading: true,
			};
		}
		case report.LOAD_REPORT: {
			return {
				...state,
				loading: true,
			};
		}
		case report.LOAD_RESULTS: {
			return {
				...state,
				results: null,
				loading: true,
			};
		}
		case report.CHANGE_STATE_FILTER: {
			return {
				...state,
				loading: true,
				state: action.payload,
				results: null,
			};
		}
		case report.LOAD_REPORT_SUCCESS: {
			return {
				...state,
				loading: false,
				report: action.payload,
			};
		}
		case report.LOAD_STATISTICS_SUCCESS: {
			return {
				...state,
				loading: false,
				statistics: action.payload,
			};
		}
		case report.LOAD_RESULTS_SUCCESS: {
			return {
				...state,
				loading: false,
				results: action.payload,
			};
		}
		case report.SELECT_CONFLICT: {
			return {
				...state,
				conflict: action.payload,
			};
		}
		case report.LOAD_FAILURE: {
			return {
				...state,
				loading: false,
			};
		}
		case report.RESOLVE: {
			return {
				...state,
				loading: true,
				conflict: new JobResult({
					...state.conflict,
					taxon: action.payload,
				}),
			};
		}
		case report.RESOLVE_SUCCESS: {
			return {
				...state,
				loading: false,
				conflict: null,
			};
		}
		default:
			return state;
	}
}
