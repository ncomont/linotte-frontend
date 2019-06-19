import * as taxref from '../actions/taxref.actions';
import { SearchParameters, Rank, Taxon } from '../../models';
import { AppSettings } from '../app.settings';

export interface State {
	loading: boolean;
	index: number;
	count: number;
	search: SearchParameters;
	ranks: Rank[];
	page: Taxon[];
}

const initialState: State = {
	loading: false,
	ranks: [],
	page: [],
	index: 0,
	count: 0,
	search: new SearchParameters(),
};

export function reducer(state = initialState, action: taxref.TaxrefActions): State {
	switch (action.type) {
		case taxref.LOAD_RANKS: {
			return {
				...state,
				loading: true,
			};
		}
		case taxref.LOAD_RANKS_SUCCESS: {
			return {
				...state,
				loading: false,
				ranks: action.payload,
			};
		}
		case taxref.LOAD_FAILURE: {
			return {
				...state,
				loading: false,
			};
		}
		case taxref.SEARCH: {
			return {
				...state,
				index: 0,
				loading: true,
				search: action.payload,
			};
		}
		case taxref.SEARCH_SUCCESS: {
			return {
				...state,
				loading: false,
				page: action.payload.results,
				count: action.payload.total,
			};
		}
		case taxref.PREVIOUS_PAGE: {
			return {
				...state,
				loading: true,
				index: state.index > 0 ? state.index - 1 : 0,
			};
		}
		case taxref.NEXT_PAGE: {
			return {
				...state,
				loading: true,
				index:
					(state.index + 1) * AppSettings.PAGE_SIZE >= state.count
						? state.index
						: state.index + 1,
			};
		}
		default:
			return state;
	}
}
