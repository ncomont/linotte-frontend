import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KeysPipe } from '../../../shared/pipes';

import { JobResult } from '../../../models';
import { ConflictComponent } from './conflict.component';

describe('ConflictComponent', () => {
	let component: ConflictComponent;
	let fixture: ComponentFixture<ConflictComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ConflictComponent, KeysPipe],
			}).compileComponents();
		}),
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ConflictComponent);
		component = fixture.componentInstance;

		const conflict = new JobResult();
		conflict.searchData = {};
		component.conflict = conflict;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
