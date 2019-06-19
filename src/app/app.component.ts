import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { SearchParameters, Taxon, JobResult } from '../models';
import { AppState } from '../shared/reducers';
import * as report from '../shared/actions/job-report.actions';
import * as taxref from '../shared/actions/taxref.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'app';

	private conflict$: Observable<JobResult>;
	private page$: Observable<Taxon[]>;

	constructor(private store: Store<AppState>) {
		this.conflict$ = this.store.select(s => s.report.conflict);
		this.page$ = this.store.select(s => s.taxref.page);
	}

	onCloseConflictEditor = () => this.store.dispatch(new report.SelectConflictAction());
	onSearch = filter => this.store.dispatch(new taxref.SearchAction(filter));
	onPreviousPage = () => this.store.dispatch(new taxref.PreviousPageAction());
	onNextPage = () => this.store.dispatch(new taxref.NextPageAction());
	onResolveConflict = ({ conflict, taxon }) =>
		this.store.dispatch(new report.ResolveAction(taxon));
}
