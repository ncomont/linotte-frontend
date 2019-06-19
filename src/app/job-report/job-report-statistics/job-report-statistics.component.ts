import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { JobReportStatistics } from '../../../models';

@Component({
	selector: 'app-job-report-statistics',
	templateUrl: './job-report-statistics.component.html',
	styleUrls: ['./job-report-statistics.component.scss'],
})
export class JobReportStatisticsComponent {
	@Input() stats$: Observable<JobReportStatistics>;
	@Output() changeState: EventEmitter<any> = new EventEmitter();
}
