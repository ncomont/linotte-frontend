import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../../shared/app.settings';

import { JobReport, JobResult, JobResultState, JobReportStatistics } from '../../models';

@Injectable()
export class JobReportService {
	constructor(private http: HttpClient) {}

	getByID(id: number): Observable<JobReport> {
		return this.http
			.get<JobReport>(`${AppSettings.JOB_REPORT_ENDPOINT}/${id}`)
			.map(JobReport.Parse);
	}

	getStatisticsByID(id: number): Observable<JobReportStatistics> {
		return this.http
			.get<JobReportStatistics>(`${AppSettings.JOB_REPORT_STATISTICS_ENDPOINT}/${id}`)
			.map(JobReportStatistics.Parse);
	}

	getResultsByState(reportId: number, state: JobResultState): Observable<JobResult[]> {
		return this.http
			.get<JobResult[]>(`${AppSettings.JOB_RESULTS_ENDPOINT}/${reportId}/${state}`)
			.map(res => (res || []).map(JobResult.Parse));
	}

	resolve(conflict: JobResult): Observable<JobResult> {
		return this.http
			.patch<JobResult>(`${AppSettings.JOB_RESULTS_ENDPOINT}`, {
				actualState: conflict.state,
				newState: JobResultState.RESOLVED,
				conflictId: conflict.id,
				taxonId: conflict.taxon.id,
			})
			.map(JobResult.Parse);
	}

	// getByID(id: number): Observable<JobReport> {
	// 	return this.http
	// 		.get(`${AppSettings.JOB_REPORT_ENDPOINT}/${id}`, this.authenticationService.options)
	// 		.map(res => res.json())
	// 		.map(JobReport.Parse);
	// }

	// resolveConflict(conflict: JobResult): Observable<JobResult> {
	// 	const temp = {
	// 		actualState: conflict.state,
	// 		newState: JobResultState.RESOLVED,
	// 		conflictId: conflict.id,
	// 		taxonId: conflict.taxon.id,
	// 	};
	//
	// 	return this.http
	// 		.put(`${AppSettings.JOB_RESULTS_ENDPOINT}`, temp, this.authenticationService.options)
	// 		.map(res => res.json())
	// 		.map(JobResult.Parse);
	// }
}
