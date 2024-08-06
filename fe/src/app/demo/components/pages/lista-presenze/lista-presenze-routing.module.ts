import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaPresenzeComponent } from './lista-presenze.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListaPresenzeComponent }
	])],
	exports: [RouterModule]
})
export class ListaPresenzeRoutingModule { }
