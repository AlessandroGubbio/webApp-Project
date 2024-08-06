import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ResocontoRoutingModule } from './resoconto-routing.module';
import { ResocontoComponent } from './resoconto.component';
import { PresenzeService } from 'src/app/demo/service/presenze.service';

@NgModule({
    imports: [
        CommonModule,
        ResocontoRoutingModule,
        ResocontoComponent,
        DropdownModule
    ],
    declarations: [],
    providers: [MessageService, PresenzeService]
})
export class ResocontoModule { }
