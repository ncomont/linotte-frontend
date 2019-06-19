import { Action } from '@ngrx/store';

import { SearchParameters, Page, Taxon, Rank } from '../../models';

export const LOAD_RANKS = '[TAXREF] LOAD RANKS';
export const LOAD_FAILURE = '[TAXREF] LOAD FAILURE';
export const LOAD_RANKS_SUCCESS = '[TAXREF] LOAD RANKS SUCCESS';
export const SEARCH = '[TAXREF] SEARCH';
export const SEARCH_SUCCESS = '[TAXREF] SEARCH SUCCESS';
export const PREVIOUS_PAGE = '[TAXREF] PREVIOUS PAGE';
export const NEXT_PAGE = '[TAXREF] NEXT PAGE';

export class LoadRanksAction implements Action {
	readonly type = LOAD_RANKS;
	constructor() {}
}

export class LoadFailureAction implements Action {
	readonly type = LOAD_FAILURE;
	constructor(public payload?: any) {}
}

export class LoadRanksSuccessAction implements Action {
	readonly type = LOAD_RANKS_SUCCESS;
	constructor(public payload: Rank[]) {}
}

export class SearchAction implements Action {
	readonly type = SEARCH;
	constructor(public payload?: SearchParameters) {}
}

export class SearchSuccessAction implements Action {
	readonly type = SEARCH_SUCCESS;
	constructor(public payload: Page<Taxon>) {}
}

export class PreviousPageAction implements Action {
	readonly type = PREVIOUS_PAGE;
	constructor() {}
}

export class NextPageAction implements Action {
	readonly type = NEXT_PAGE;
	constructor() {}
}

export type TaxrefActions =
	| LoadRanksAction
	| LoadFailureAction
	| LoadRanksSuccessAction
	| SearchAction
	| SearchSuccessAction
	| PreviousPageAction
	| NextPageAction;
