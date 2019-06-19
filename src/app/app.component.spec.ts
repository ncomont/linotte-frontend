import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { KeysPipe } from '../shared/pipes';
import * as components from '.';
import { reducers, metaReducers } from '../shared/reducers';

describe('AppComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [
					KeysPipe,
					components.AppComponent,
					components.NavbarComponent,
					components.JobListComponent,
					components.JobItemStatusComponent,
					components.JobItemActionComponent,
					components.TaxonListComponent,
					components.TaxonPaginatorComponent,
					components.TaxonFiltersComponent,
					components.ConflictComponent,
					components.ConflictEditorComponent,
				],
				imports: [
					FormsModule,
					RouterTestingModule,
					StoreModule.forRoot(reducers, {
						metaReducers,
					}),
				],
			}).compileComponents();
		}),
	);

	it(
		'should create the app',
		async(() => {
			const fixture = TestBed.createComponent(components.AppComponent);
			const app = fixture.debugElement.componentInstance;
			expect(app).toBeTruthy();
		}),
	);

	it(
		'should render nav bar',
		async(() => {
			const fixture = TestBed.createComponent(components.AppComponent);
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('app-navbar')).not.toBeFalsy();
		}),
	);
});
