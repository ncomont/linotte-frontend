import { JobReport, JobReportStatus } from './job-report.model';

export class JobType {
	static RED_LIST = 'RL';
	static ZNIEFF = 'ZN';
	static STATUS = 'ST';
	static TELETRANSMISSION = 'TT';
}

export class JobStatus {
	static NEW = 'NEW';
	static STACKED = 'STACKED';
	static PENDING = 'PENDING';
	static ARCHIVED = 'ARCHIVED';
	static IDLE = 'IDLE';
	static ERROR = 'ERROR';
	static WARNING = 'WARNING';
	static PASSED = 'PASSED';
}

export class Job {
	id: number;
	name: string;
	file: string;
	redListId: number;
	lastUpdate: Date;
	reports: JobReport[];
	_type: string;
	_status: string;

	public static Parse(json: any): Job {
		const job: Job = new Job({
			id: json.id,
			name: json.name,
			file: json.file,
			redListId: json.red_list_id,
			lastUpdate: json.last_update ? new Date(json.last_update.seconds * 1000) : 0,
			_status: json.status,
			_type: json.type,
			reports: json.reports ? json.reports.map(r => JobReport.Parse(r)) : [],
		});

		if (job.reports && job.reports.length) {
			job._status = job.reports[0].status;
		}

		return job;
	}

	public constructor(init?) {
		Object.assign(this, init);
	}

	get status() {
		return {
			pending: this._status && this._status.includes('%'),
			new: this._status === JobStatus.NEW,
			stacked: this._status === JobStatus.STACKED,
			archived: this._status === JobStatus.ARCHIVED,
			passed: this._status === JobReportStatus.PASSED,
			error: this._status === JobStatus.ERROR,
			warning: this._status === JobStatus.WARNING,
		};
	}

	get progress() {
		return this.status.pending ? this._status : 0;
	}

	get type() {
		return {
			redlist: this._type === JobType.RED_LIST,
			znieff: this._type === JobType.ZNIEFF,
			status: this._type === JobType.STATUS,
			teletransmission: this._type === JobType.TELETRANSMISSION,
		};
	}
}
