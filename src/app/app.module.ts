import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as pipes from '../shared/pipes';

import { routes } from './routes';
import { reducers, metaReducers } from '../shared/reducers';
import { AuthenticationGuard } from '../shared/authentication.guard';

import * as intercetors from '../shared/interceptors';
import * as effects from '../shared/effects';
import * as services from '../shared/services';
import * as components from '.';

@NgModule({
	declarations: [
		pipes.KeysPipe,
		pipes.FrDatePipe,
		components.AppComponent,
		components.JobListComponent,
		components.NavbarComponent,
		components.JobCreationComponent,
		components.TaxonListComponent,
		components.BrowseTaxrefComponent,
		components.TaxonPaginatorComponent,
		components.TaxonFiltersComponent,
		components.LoginComponent,
		components.JobItemStatusComponent,
		components.JobItemActionComponent,
		components.JobReportComponent,
		components.JobReportStatisticsComponent,
		components.ConflictEditorComponent,
		components.ConflictComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([effects.UserEffects, effects.TaxrefEffects, effects.JobEffects, effects.JobReportEffects]),
		RouterModule.forRoot(routes, { enableTracing: false, useHash: true }),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: intercetors.AuthenticationInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: intercetors.UnauthorizedInterceptor,
			multi: true,
		},
		AuthenticationGuard,
		services.UserService,
		services.TaxrefService,
		services.JobService,
		services.JobReportService,
	],
	bootstrap: [components.AppComponent],
})
export class AppModule {}
