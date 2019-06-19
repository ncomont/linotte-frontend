import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SearchParameters } from '../../../models';
import { AppSettings } from '../../../shared/app.settings';
import { TaxonListDisplayMode } from '../taxon-list.component';

declare var $: any;

@Component({
	selector: 'app-taxon-filters',
	templateUrl: './taxon-filters.component.html',
	styleUrls: ['./taxon-filters.component.scss'],
})
export class TaxonFiltersComponent {
	@Input() displayMode: TaxonListDisplayMode = TaxonListDisplayMode.Full;
	@Output() search: EventEmitter<any> = new EventEmitter();

	private TaxonListDisplayMode = TaxonListDisplayMode;
	private searchTimeout: any;
	private _restrict: boolean;
	private _reference: boolean;
	private _filters: SearchParameters;

	_search() {
		this.search.emit(this._filters);
	}

	@Input('initialFilters')
	set initialFilters(f) {
		this._filters = f;
		this._search();
	}

	set term(t: string) {
		this._filters.term = t;
		this._search();
	}

	get term() {
		return this._filters.term;
	}

	set restrict(restrict: boolean) {
		this._restrict = restrict;
		this._filters.ranks = restrict ? AppSettings.USUAL_RANKS : [];
		this._search();
	}

	get restrict() {
		return this._restrict;
	}

	set reference(ref: boolean) {
		this._reference = ref;
		this._filters.reference = ref;
		this._search();
	}

	get reference() {
		return this._reference;
	}
}
