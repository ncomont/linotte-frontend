import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../../shared/app.settings';

import { Taxon, SearchParameters } from '../../models';
import { AppState } from '../../shared/reducers';
import * as taxref from '../../shared/actions/taxref.actions';
import { TaxonListDisplayMode } from '../taxon-list/taxon-list.component';

@Component({
	selector: 'app-browse-taxref',
	templateUrl: './browse-taxref.component.html',
	styleUrls: ['./browse-taxref.component.scss'],
})
export class BrowseTaxrefComponent {
	private TaxonListDisplayMode = TaxonListDisplayMode;
	private page$: Observable<Taxon[]>;

	constructor(private store: Store<AppState>) {
		this.page$ = this.store.select(s => s.taxref.page);
	}

	onSearch = filter => this.store.dispatch(new taxref.SearchAction(filter));
	onPreviousPage = () => this.store.dispatch(new taxref.PreviousPageAction());
	onNextPage = () => this.store.dispatch(new taxref.NextPageAction());
}
