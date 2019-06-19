import { Component, OnInit, Input } from '@angular/core';

import { Job } from '../../../models';

@Component({
	selector: 'app-job-item-status',
	templateUrl: './job-item-status.component.html',
	styleUrls: ['./job-item-status.component.scss'],
})
export class JobItemStatusComponent {
	@Input() job: Job;
}
