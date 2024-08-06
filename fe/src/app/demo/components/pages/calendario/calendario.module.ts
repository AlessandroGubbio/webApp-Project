import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from 'src/app/demo/service/news.service';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CalendarioComponent } from './calendario.component';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { DipendentiService } from 'src/app/demo/service/dipendenti.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarioComponent,
    CalendarioRoutingModule
  ],
  providers: [DipendentiService, MessageService],
})
export class CalendarioModule { }