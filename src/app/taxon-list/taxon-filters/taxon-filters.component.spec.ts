import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SearchParameters } from '../../../models';
import { TaxonFiltersComponent } from './taxon-filters.component';

describe('TaxonFiltersComponent', () => {
	let component: TaxonFiltersComponent;
	let fixture: ComponentFixture<TaxonFiltersComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [TaxonFiltersComponent],
				imports: [FormsModule],
			}).compileComponents();
		}),
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TaxonFiltersComponent);
		component = fixture.componentInstance;
		component.initialFilters = new SearchParameters();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
