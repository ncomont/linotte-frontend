import * as taxref from '../actions/taxref.actions';
import { reducer } from './taxref.reducer';
import { Rank, Taxon, Page, SearchParameters } from '../../models';
import { AppSettings } from '../app.settings';

const initial = {
	loading: false,
	ranks: [],
	page: [],
	index: 0,
	count: 0,
	search: new SearchParameters(),
};

const ranks = [
	new Rank({ id: Math.floor(Math.random() * 1000) }),
	new Rank({ id: Math.floor(Math.random() * 1000) }),
	new Rank({ id: Math.floor(Math.random() * 1000) }),
];

const sp = new SearchParameters();
sp.term = 'linotte';
sp.ranks = ['ES', 'SSES'];
sp.reference = true;

const page = new Page<Taxon>();
page.total = 42;
page.results = [
	new Taxon({ id: Math.floor(Math.random() * 1000) }),
	new Taxon({ id: Math.floor(Math.random() * 1000) }),
	new Taxon({ id: Math.floor(Math.random() * 1000) }),
];

describe('TaxrefReducer', () => {
	it('should handle initial state', () => {
		expect(reducer(undefined, { type: undefined })).toEqual(initial);
	});

	it('should handle LOAD_RANKS', () => {
		expect(reducer(initial, new taxref.LoadRanksAction())).toEqual({
			...initial,
			loading: true,
		});
	});

	it('should handle LOAD_FAILURE', () => {
		expect(reducer(initial, new taxref.LoadFailureAction())).toEqual(initial);
	});

	it('should handle LOAD_RANKS_SUCCESS', () => {
		expect(reducer(initial, new taxref.LoadRanksSuccessAction(ranks))).toEqual({
			...initial,
			ranks,
		});
	});

	it('should handle SEARCH', () => {
		expect(reducer(initial, new taxref.SearchAction(sp))).toEqual({
			...initial,
			loading: true,
			search: sp,
		});
	});

	it('should handle SEARCH_SUCCESS', () => {
		expect(reducer(initial, new taxref.SearchSuccessAction(page))).toEqual({
			...initial,
			page: page.results,
			count: page.total,
		});
	});

	it('should handle PREVIOUS_PAGE', () => {
		expect(reducer({ ...initial, index: 5 }, new taxref.PreviousPageAction())).toEqual({
			...initial,
			loading: true,
			index: 4,
		});
	});

	it('should handle NEXT_PAGE', () => {
		expect(
			reducer(
				{ ...initial, index: 0, count: AppSettings.PAGE_SIZE + 1 },
				new taxref.NextPageAction(),
			),
		).toEqual({
			...initial,
			count: AppSettings.PAGE_SIZE + 1,
			loading: true,
			index: 1,
		});
	});

	it('should restore index on SEARCH', () => {
		expect(reducer({ ...initial, index: 666 }, new taxref.SearchAction(sp))).toEqual({
			...initial,
			loading: true,
			search: sp,
		});
	});

	it('should not allow to go to page -1 on PREVIOUS_PAGE', () => {
		expect(reducer(initial, new taxref.PreviousPageAction())).toEqual({
			...initial,
			loading: true,
		});
	});

	it('should not allow the number of pages to be exceeded on NEXT_PAGE', () => {
		expect(
			reducer({ ...initial, count: AppSettings.PAGE_SIZE - 1 }, new taxref.NextPageAction()),
		).toEqual({
			...initial,
			count: AppSettings.PAGE_SIZE - 1,
			loading: true,
		});
	});
});
