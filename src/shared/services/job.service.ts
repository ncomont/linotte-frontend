import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../../shared/app.settings';
import { Job, JobStatus } from '../../models';

@Injectable()
export class JobService {
	constructor(private http: HttpClient) {}

	getAll(): Observable<Job[]> {
		return this.http.get<Job[]>(AppSettings.JOB_ENDPOINT).map(res => res.map(Job.Parse));
	}

	start(job: Job): Observable<Job> {
		if (![JobStatus.NEW, JobStatus.IDLE].includes(job._status)) {
			return Observable.throw('This job cannot be started');
		}

		return this.http
			.patch<Job>(`${AppSettings.JOB_ENDPOINT}`, {
				...job,
				status: JobStatus.STACKED,
			})
			.map(Job.Parse);
	}

	// getById(id: number): Observable<Job> {
	// 	return this.http
	// 		.get(`${AppSettings.JOB_ENDPOINT}/${id}`, this.authenticationService.options)
	// 		.map(res => Job.Parse(res.json()));
	// }
	//
	// getReports(id: number): Observable<JobReport[]> {
	// 	return this.http
	// 		.get(`${AppSettings.JOB_REPORTS_ENDPOINT}/${id}`, this.authenticationService.options)
	// 		.map(res => res.json())
	// 		.map(res => res.map(JobReport.Parse));
	// }
}
