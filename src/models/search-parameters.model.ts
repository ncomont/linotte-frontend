export class SearchParameters {
	id: number;
	ranks: string[];
	term: string;
	reference: boolean;
	ids: number[];

	constructor() {
		this.term = '';
	}
}
