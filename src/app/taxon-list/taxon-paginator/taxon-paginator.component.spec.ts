import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonPaginatorComponent } from './taxon-paginator.component';

describe('TaxonPaginatorComponent', () => {
	let component: TaxonPaginatorComponent;
	let fixture: ComponentFixture<TaxonPaginatorComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [TaxonPaginatorComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(TaxonPaginatorComponent);
			component = fixture.componentInstance;

			spyOn(component.previousPage, 'emit');
			spyOn(component.nextPage, 'emit');

			fixture.detectChanges();
		}),
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render the previous page button', () => {
		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('button.previous-page');
		expect(button).toBeTruthy();
	});

	it('should render the next page button', () => {
		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('button.next-page');
		expect(button).toBeTruthy();
	});

	it('should emit previous page event', () => {
		const compiled = fixture.debugElement.nativeElement;
		const button = compiled.querySelector('button.previous-page').click();

		expect(component.previousPage.emit).toHaveBeenCalled();
	});

	it('should emit next page event', () => {
		const compiled = fixture.debugElement.nativeElement;
		compiled.querySelector('button.next-page').click();

		expect(component.nextPage.emit).toHaveBeenCalledWith();
	});
});
