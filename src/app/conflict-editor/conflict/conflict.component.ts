import { Component, Input } from '@angular/core';

import { Taxon, JobResult } from '../../../models';

@Component({
	selector: 'app-conflict',
	templateUrl: './conflict.component.html',
	styleUrls: ['./conflict.component.scss'],
})
export class ConflictComponent {
	@Input() conflict: JobResult;
	@Input() selectedTaxon: Taxon;
}
