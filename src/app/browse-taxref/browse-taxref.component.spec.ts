import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';

import { AppSettings } from '../../shared/app.settings';
import { AppState, reducers, metaReducers } from '../../shared/reducers';
import * as taxref from '../../shared/actions/taxref.actions';
import * as components from '../';
import { SearchParameters } from '../../models';

describe('BrowseTaxrefComponent', () => {
	let component: components.BrowseTaxrefComponent;
	let fixture: ComponentFixture<components.BrowseTaxrefComponent>;
	let spy: any;
	let store: Store<AppState>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					components.BrowseTaxrefComponent,
					components.TaxonListComponent,
					components.TaxonPaginatorComponent,
					components.TaxonFiltersComponent,
				],
				imports: [
					FormsModule,
					StoreModule.forRoot(reducers, {
						metaReducers,
					}),
				],
			}).compileComponents();

			store = TestBed.get(Store);
			spy = spyOn(store, 'dispatch').and.callThrough();
		}),
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(components.BrowseTaxrefComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	// TODO:
	// it('should dispatch search action', () => {
	// 	expect(store.dispatch).toHaveBeenCalledWith(new taxref.SearchAction());
	// });

	it('should render taxon list component', () => {
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('app-taxon-list')).toBeTruthy();
	});

	it('should dispatch search action filtered by reference', cb => {
		spy.calls.reset();
		const compiled = fixture.debugElement.nativeElement;

		const p = new SearchParameters();
		p.reference = true;

		compiled.querySelector('#reference-filter').click();
		setTimeout(() => {
			expect(store.dispatch).toHaveBeenCalledWith(new taxref.SearchAction(p));
			cb();
		}, AppSettings.SEARCH_TIMER_VALUE + 5);
	});

	it('should dispatch search action filtered by ranks', cb => {
		spy.calls.reset();
		const compiled = fixture.debugElement.nativeElement;

		const p = new SearchParameters();
		p.ranks = AppSettings.USUAL_RANKS;

		compiled.querySelector('#rank-filter').click();
		setTimeout(() => {
			expect(store.dispatch).toHaveBeenCalledWith(new taxref.SearchAction(p));
			cb();
		}, AppSettings.SEARCH_TIMER_VALUE + 5);
	});

	it('should dispatch search action filtered by term', cb => {
		spy.calls.reset();
		const compiled = fixture.debugElement.nativeElement;

		const p = new SearchParameters();
		p.term = 'linotte';

		const input = compiled.querySelector('#term-filter');
		input.value = 'linotte';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		setTimeout(() => {
			expect(store.dispatch).toHaveBeenCalledWith(new taxref.SearchAction(p));
			cb();
		}, AppSettings.SEARCH_TIMER_VALUE + 5);
	});

	it('should debounce user inputs', cb => {
		spy.calls.reset();
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
			expect(spy.calls.count()).toBe(1);
			expect(store.dispatch).toHaveBeenCalledWith(new taxref.SearchAction(p));
			cb();
		}, AppSettings.SEARCH_TIMER_VALUE + 5);
	});

	it('should dispatch previous page action', () => {
		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('button.previous-page').click();

		expect(store.dispatch).toHaveBeenCalledWith(new taxref.PreviousPageAction());
	});

	it('should dispatch next page action', () => {
		const compiled = fixture.debugElement.nativeElement;
		compiled.querySelector('button.next-page').click();

		expect(store.dispatch).toHaveBeenCalledWith(new taxref.NextPageAction());
	});
});
