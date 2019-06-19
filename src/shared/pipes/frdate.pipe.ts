import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'frdate' })
export class FrDatePipe implements PipeTransform {
	transform(value: any, pattern: string = 'mediumDate'): any {
		const p: DatePipe = new DatePipe('fr');
		return p.transform(value, pattern);
	}
}
