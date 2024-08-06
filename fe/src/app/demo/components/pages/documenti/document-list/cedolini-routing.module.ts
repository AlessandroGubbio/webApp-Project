import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CedoliniComponent } from './cedolini.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CedoliniComponent }
	])],
	exports: [RouterModule]
})
export class CedoliniRoutingModule { }

