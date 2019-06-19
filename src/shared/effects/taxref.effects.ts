import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { PageRequest } from '../../models';
import { TaxrefService } from '../services';
import { AppState } from '../reducers';
import * as taxref from '../actions/taxref.actions';

@Injectable()
export class TaxrefEffects {
	@Effect()
	loadRanks$ = this.actions.ofType(taxref.LOAD_RANKS).exhaustMap(() =>
		this.service
			.getRanks()
			.map(ranks => new taxref.LoadRanksSuccessAction(ranks))
			.catch(e => Observable.of(new taxref.LoadFailureAction(e))),
	);

	@Effect()
	search$ = this.actions
		.ofType(taxref.SEARCH, taxref.NEXT_PAGE, taxref.PREVIOUS_PAGE)
		.withLatestFrom(this.store)
		.map(([action, state]) => state.taxref)
		.switchMap(state =>
			this.service
				.search(new PageRequest(state.search, state.index))
				.map(page => new taxref.SearchSuccessAction(page))
				.catch(e => Observable.of(new taxref.LoadFailureAction(e))),
		);

	constructor(
		private actions: Actions,
		private store: Store<AppState>,
		private service: TaxrefService,
	) {}
}
