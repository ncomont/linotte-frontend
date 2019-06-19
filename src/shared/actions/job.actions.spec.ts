import * as job from '../actions/job.actions';
import { Job } from '../../models';

const mock = [
	new Job({ id: Math.floor(Math.random() * 1000) }),
	new Job({ id: Math.floor(Math.random() * 1000) }),
	new Job({ id: Math.floor(Math.random() * 1000) }),
];

describe('JobActions', () => {
	it('should create a "load jobs" action', () => {
		const action = new job.LoadJobsAction();
		expect(action.type).toBe(job.LOAD_JOBS);
	});

	it('should create a "load failure" action', () => {
		const action = new job.LoadFailureAction({ error: 'error' });
		expect(action.type).toBe(job.LOAD_FAILURE);
		expect(action.payload).toEqual({ error: 'error' });
	});

	it('should create a "load jobs success" action', () => {
		const action = new job.LoadJobsSuccessAction(mock);
		expect(action.type).toBe(job.LOAD_JOBS_SUCCESS);
		expect(action.payload).toEqual(mock);
	});
});
