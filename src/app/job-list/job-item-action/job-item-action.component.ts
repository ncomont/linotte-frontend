import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Job, JobStatus } from '../../../models';

@Component({
	selector: 'app-job-item-action',
	templateUrl: './job-item-action.component.html',
	styleUrls: ['./job-item-action.component.scss'],
})
export class JobItemActionComponent {
	@Input() job: Job;
	@Output() start: EventEmitter<any> = new EventEmitter();
	@Output() open: EventEmitter<any> = new EventEmitter();

	private ACTIONS: any[];

	constructor() {
		this.ACTIONS = [
			{
				label: 'Télécharger',
				icon: 's7-cloud-download',
				status: [JobStatus.PASSED, JobStatus.WARNING],
				default: JobStatus.PASSED,
				action: () => this.open.emit(this.job.reports[0]),
			},
			{
				label: 'Démarrer',
				icon: 's7-play',
				status: [JobStatus.NEW],
				default: JobStatus.NEW,
				action: () => this.start.emit(this.job),
			},
			{
				label: 'Résoudre',
				icon: 's7-magic-wand',
				status: [JobStatus.WARNING],
				default: JobStatus.WARNING,
				action: () => this.open.emit(this.job.reports[0]),
			},
			{
				label: 'Supprimer',
				icon: 's7-trash',
				status: [JobStatus.PASSED, JobStatus.NEW, JobStatus.WARNING, JobStatus.ERROR],
				default: JobStatus.ERROR,
				action: () => this.open.emit(this.job.reports[0]),
			},
		];
	}

	get actions() {
		return [
			this.ACTIONS.find(a => a.default === this.job._status),
			...this.ACTIONS.filter(
				a => a.default !== this.job._status && a.status.includes(this.job._status),
			),
		].filter(Boolean);
	}
}
