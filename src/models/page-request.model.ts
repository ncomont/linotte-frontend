import { SearchParameters } from '.';

export class PageRequest {
	search: SearchParameters;
	offset: number;

	constructor(search: SearchParameters, offset: number) {
		this.search = search;
		this.offset = offset;
	}
}
