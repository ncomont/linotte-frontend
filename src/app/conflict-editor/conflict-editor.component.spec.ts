import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { KeysPipe } from '../../shared/pipes';

import { JobResult } from '../../models';
import { reducers, metaReducers } from '../../shared/reducers';
import {
	ConflictComponent,
	ConflictEditorComponent,
	TaxonListComponent,
	TaxonFiltersComponent,
	TaxonPaginatorComponent,
} from '../';

describe('ConflictEditorComponent', () => {
	let component: ConflictEditorComponent;
	let fixture: ComponentFixture<ConflictEditorComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					KeysPipe,
					ConflictEditorComponent,
					ConflictComponent,
					TaxonListComponent,
					TaxonFiltersComponent,
					TaxonPaginatorComponent,
				],
				imports: [
					FormsModule,
					StoreModule.forRoot(reducers, {
						metaReducers,
					}),
				],
			}).compileComponents();

			fixture = TestBed.createComponent(ConflictEditorComponent);
			component = fixture.componentInstance;

			const result = new JobResult();
			result.searchData = {};
			component.conflict = result;

			fixture.detectChanges();
		}),
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render conflict component', () => {
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('app-conflict')).toBeTruthy();
	});
});
