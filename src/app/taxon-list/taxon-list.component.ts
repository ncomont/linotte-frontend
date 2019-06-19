import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../shared/app.settings';

import { Taxon, SearchParameters } from '../../models';
import { AppState } from '../../shared/reducers';
import * as taxref from '../../shared/actions/taxref.actions';

export enum TaxonListDisplayMode {
	Simple,
	Full,
}

@Component({
	selector: 'app-taxon-list',
	templateUrl: './taxon-list.component.html',
	styleUrls: ['./taxon-list.component.scss'],
})
export class TaxonListComponent implements OnInit {
	@Input() initialFilters: SearchParameters = new SearchParameters();
	@Input() displayMode: TaxonListDisplayMode;
	@Input() page: Taxon[];

	@Output() pick: EventEmitter<any> = new EventEmitter();
	@Output() previousPage: EventEmitter<any> = new EventEmitter();
	@Output() nextPage: EventEmitter<any> = new EventEmitter();
	@Output() search: EventEmitter<any> = new EventEmitter();

	private searchTimeout: any;

	ngOnInit() {
		this.onSearch(this.initialFilters);
	}

	onSearch = event => {
		clearTimeout(this.searchTimeout);
		this.searchTimeout = setTimeout(
			() => this.search.emit(event),
			AppSettings.SEARCH_TIMER_VALUE,
		);
	};
}
