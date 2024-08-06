import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResocontoComponent } from './resoconto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ResocontoComponent }
	])],
	exports: [RouterModule]
})
export class ResocontoRoutingModule { }
