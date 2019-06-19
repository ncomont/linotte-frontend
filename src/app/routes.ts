import { Routes } from '@angular/router';

import { AuthenticationGuard } from '../shared/authentication.guard';
import {
	LoginComponent,
	JobListComponent,
	JobCreationComponent,
	JobReportComponent,
	BrowseTaxrefComponent,
	ConflictEditorComponent,
} from '.';

export const routes: Routes = [
	{ path: 'connexion', component: LoginComponent },
	{ path: 'mes-jobs', component: JobListComponent, canActivate: [AuthenticationGuard] },
	{ path: 'nouveau-job', component: JobCreationComponent, canActivate: [AuthenticationGuard] },
	{ path: 'rapport/:id', component: JobReportComponent, canActivate: [AuthenticationGuard] },
	{
		path: 'parcourir-taxref',
		component: BrowseTaxrefComponent,
		canActivate: [AuthenticationGuard],
	},
	{ path: '**', redirectTo: '/mes-jobs', pathMatch: 'full' },
];
