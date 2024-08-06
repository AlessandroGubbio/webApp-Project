import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagementProgettiComponent } from './management-progetti.component';
import { roleGuard } from 'src/app/demo/service/roleGuard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ManagementProgettiComponent, canActivate: [roleGuard]}
	])],
	exports: [RouterModule]
})
export class ManagementProgettiRoutingModule { }
