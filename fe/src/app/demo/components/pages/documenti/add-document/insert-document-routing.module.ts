import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsertDocumentComponent } from './insert-document.component';
import { roleGuard } from 'src/app/demo/service/roleGuard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: InsertDocumentComponent, canActivate: [roleGuard]}
	])],
	exports: [RouterModule]
})
export class InsertDocumentRoutingModule { }
