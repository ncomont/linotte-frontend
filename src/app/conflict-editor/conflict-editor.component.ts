import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Taxon, JobResult, SearchParameters } from '../../models';
import { TaxonListDisplayMode } from '../taxon-list/taxon-list.component';

@Component({
	selector: 'app-conflict-editor',
	templateUrl: './conflict-editor.component.html',
	styleUrls: ['./conflict-editor.component.scss'],
})
export class ConflictEditorComponent implements OnInit {
	@Input() conflict: JobResult;

	@Output() close: EventEmitter<any> = new EventEmitter();
	@Output() validate: EventEmitter<any> = new EventEmitter();
	@Output() pick: EventEmitter<any> = new EventEmitter();
	@Output() previousPage: EventEmitter<any> = new EventEmitter();
	@Output() nextPage: EventEmitter<any> = new EventEmitter();
	@Output() search: EventEmitter<any> = new EventEmitter();

	@Input() page: Taxon[];

	private TaxonListDisplayMode = TaxonListDisplayMode;
	private filters: SearchParameters = new SearchParameters();
	private selectedTaxon: Taxon = null;

	constructor() {}

	ngOnInit() {
		this.filters = this.getBestSearchCriteria();
	}

	reset() {
		this.selectedTaxon = null;
	}

	getBestSearchCriteria() {
		const params = new SearchParameters();
		params.term = this.conflict.getFallbackSearchCriteria();
		return params;
	}

	onPreviousPage = () => this.previousPage.emit();
	onNextPage = () => this.nextPage.emit();
	onSearch = parameters => this.search.emit(parameters);
	onPick = (taxon: Taxon) => {
		this.selectedTaxon = taxon;
	};
}
