import * as job from '../actions/job.actions';
import { Job } from '../../models';

export interface State {
	loading: boolean;
	jobs: Job[];
}

const initialState: State = {
	loading: false,
	jobs: [],
};

export function reducer(state = initialState, action: job.JobActions): State {
	switch (action.type) {
		case job.LOAD_JOBS: {
			return {
				...state,
				loading: true,
			};
		}
		case job.LOAD_JOBS_SUCCESS: {
			return {
				...state,
				loading: false,
				jobs: action.payload,
			};
		}
		case job.LOAD_FAILURE: {
			return {
				...state,
				loading: false,
			};
		}
		case job.STATE_CHANGED: {
			return {
				...state,
				jobs: state.jobs.map(j => (j.id === action.payload.id ? action.payload : j)),
				loading: false,
			};
		}
		default:
			return state;
	}
}
