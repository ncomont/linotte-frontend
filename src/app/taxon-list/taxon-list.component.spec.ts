import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppSettings } from '../../shared/app.settings';
import * as components from '../';
import { TaxonListDisplayMode } from './taxon-list.component';
import { SearchParameters } from '../../models';

describe('TaxonListComponent', () => {
	let component: components.TaxonListComponent;
	let fixture: ComponentFixture<components.TaxonListComponent>;
	let searchSpy: any;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					components.TaxonListComponent,
					components.TaxonPaginatorComponent,
					components.TaxonFiltersComponent,
				],
				imports: [FormsModule],
			}).compileComponents();

			fixture = TestBed.createComponent(components.TaxonListComponent);
			component = fixture.componentInstance;

			component.displayMode = TaxonListDisplayMode.Full;
			spyOn(component.pick, 'emit');
			searchSpy = spyOn(component.search, 'emit');

			fixture.detectChanges();
		}),
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit search event', () => {
		expect(component.search.emit).toHaveBeenCalledWith(new SearchParameters());
	});

	it('should emit search event with a reference-only filter', cb => {
		const compiled = fixture.debugElement.nativeElement;

		const p = new SearchParameters();
		p.reference = true;

		compiled.querySelector('#reference-filter').click();
		setTimeout(() => {
			expect(component.search.emit).toHaveBeenCalledWith(p);
			cb();
		}, AppSettings.SEARCH_TIMER_VALUE + 5);
	});

	it('should emit search event with a ranks filter', cb => {
		const compiled = fixture.debugElement.nativeElement;

		const p = new SearchParameters();
		p.ranks = AppSettings.USUAL_RANKS;

		compiled.querySelector('#rank-filter').click();
		setTimeout(() => {
			expect(component.search.emit).toHaveBeenCalledWith(p);
			cb();
		}, AppSettings.SEARCH_TIMER_VALUE + 5);
	});

	it('should emit search event with a term filter', cb => {
		const compiled = fixture.debugElement.nativeElement;

		const p = new SearchParameters();
		p.term = 'linotte';

		const input = compiled.querySelector('#term-filter');
		input.value = 'linotte';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		setTimeout(() => {
			expect(component.search.emit).toHaveBeenCalledWith(p);
			cb();
		}, AppSettings.SEARCH_TIMER_VALUE + 5);
	});

	it('should debounce user inputs', cb => {
		searchSpy.calls.reset();
		const compiled = fixture.debugElement.nativeElement;
		const p = new SearchParameters();
		const input = compiled.querySelector('#term-filter');

		p.term = 'lin';

		input.value = 'l';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		input.value = 'li';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		input.value = 'lin';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		setTimeout(() => {
			expect(searchSpy.calls.count()).toBe(1);
			expect(component.search.emit).toHaveBeenCalledWith(p);
			cb();
		}, AppSettings.SEARCH_TIMER_VALUE + 5);
	});
});
