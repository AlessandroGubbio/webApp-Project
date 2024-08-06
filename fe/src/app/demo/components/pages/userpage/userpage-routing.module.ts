import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserpageComponent } from './userpage.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UserpageComponent }
	])],
	exports: [RouterModule]
})
export class UserPageRoutingModule { }