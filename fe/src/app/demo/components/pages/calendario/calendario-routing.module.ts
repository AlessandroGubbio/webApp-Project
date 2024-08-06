import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarioComponent } from './calendario.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CalendarioComponent }
	])],
	exports: [RouterModule]
})
export class CalendarioRoutingModule { }