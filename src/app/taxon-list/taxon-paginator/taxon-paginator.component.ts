import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-taxon-paginator',
	templateUrl: './taxon-paginator.component.html',
	styleUrls: ['./taxon-paginator.component.scss'],
})
export class TaxonPaginatorComponent {
	@Output() previousPage: EventEmitter<any> = new EventEmitter();
	@Output() nextPage: EventEmitter<any> = new EventEmitter();
}
