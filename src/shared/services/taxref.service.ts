import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from '../app.settings';

import { Page, PageRequest, Taxon, Rank } from '../../models';

@Injectable()
export class TaxrefService {
	constructor(private http: HttpClient) {}

	getRanks(): Observable<Rank[]> {
		return this.http.get<Rank[]>(AppSettings.RANK_ENDPOINT).map(res => res.map(Rank.Parse));
	}

	search(parameters: PageRequest): Observable<Page<Taxon>> {
		return this.http
			.post<Page<Taxon>>(`${AppSettings.TAXON_SEARCH_ENDPOINT}`, {
				...parameters.search,
				offset: parameters.offset,
				limit: AppSettings.PAGE_SIZE,
			})
			.map(page => ({
				...page,
				results: page.results ? page.results.map(Taxon.Parse) : [],
			}));
	}

	// getByID(id: number): Observable<Taxon> {
	// 	return this.http
	// 		.get(`${AppSettings.TAXON_ENDPOINT}/${id}`)
	// 		.map((res: Response) => Taxon.Parse(res.json()));
	// }
	//
	// getByIDs(ids: number[]): Observable<Taxon[]> {
	// 	return this.http
	// 		.post(`${AppSettings.TAXON_SEARCH_ENDPOINT}`, new SearchParameters({ ids }))
	// 		.map((res: Response) => res.json())
	// 		.map(res => res.map(Taxon.Parse));
	// }
	//
	// getReferenceAndSynonymsForID(id: number): Observable<Taxon[]> {
	// 	return this.http
	// 		.get(`${AppSettings.TAXON_REFERENCE_AND_SYNONYMS_ENDPOINT}/${id}`)
	// 		.map((res: Response) => res.json())
	// 		.map(res => res.map(Taxon.Parse));
	// }
	//
	// getTaxonomicClassificationForID(id: number, depth: number): Observable<Taxon> {
	// 	return this.http
	// 		.get(`${AppSettings.TAXON_TAXONOMIC_CLASSIFICATION_ENDPOINT}/${id}/${depth}`)
	// 		.map((res: Response) => Taxon.Parse(res.json()));
	// }

	// private convertPage(json) {
	// 	const page = new Page<Taxon>(json);
	// 	page.items = json.results ? json.results.map(raw => Taxon.Parse(raw)) : [];
	// 	return page;
	// }
}
