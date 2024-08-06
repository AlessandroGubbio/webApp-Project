import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPresenzeComponent } from './lista-presenze.component';
import { ListaPresenzeRoutingModule } from './lista-presenze-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [
        CommonModule,
        ListaPresenzeRoutingModule,
        ListaPresenzeComponent,
        DropdownModule
    ],
    declarations: [],
    providers: [MessageService]
})
export class ListaPresenzeModule { }
