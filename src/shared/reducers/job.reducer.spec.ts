import * as job from '../actions/job.actions';
import { reducer } from './job.reducer';
import { Job } from '../../models';

const initial = {
	loading: false,
	jobs: [],
};

const mock = [
	new Job({ id: Math.floor(Math.random() * 1000) }),
	new Job({ id: Math.floor(Math.random() * 1000) }),
	new Job({ id: Math.floor(Math.random() * 1000) }),
];

describe('JobReducer', () => {
	it('should handle initial state', () => {
		expect(reducer(undefined, { type: undefined })).toEqual(initial);
	});

	it('should handle LOAD_JOBS', () => {
		expect(reducer(initial, new job.LoadJobsAction())).toEqual({
			loading: true,
			jobs: [],
		});
	});

	it('should handle LOAD_JOBS_SUCCESS', () => {
		expect(reducer(initial, new job.LoadJobsSuccessAction(mock))).toEqual({
			loading: false,
			jobs: mock,
		});
	});

	it('should handle LOAD_JOBS_FAILURE', () => {
		expect(reducer(initial, new job.LoadFailureAction())).toEqual({
			loading: false,
			jobs: [],
		});
	});
});
