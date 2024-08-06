import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DipendentiDocsComponent } from './dipendenti-docs.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DipendentiDocsComponent }
	])],
	exports: [RouterModule]
})
export class DipendentiDocsRoutingModule { }
