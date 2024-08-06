import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DipendentiComponent } from './dipendenti.component';
import { roleGuard } from 'src/app/demo/service/roleGuard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DipendentiComponent, canActivate: [roleGuard] }
	])],
	exports: [RouterModule]
})
export class DipendentiRoutingModule { }
