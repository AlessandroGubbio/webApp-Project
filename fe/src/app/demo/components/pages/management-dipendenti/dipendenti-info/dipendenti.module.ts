import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DipendentiComponent } from './dipendenti.component';
import { DipendentiService } from 'src/app/demo/service/dipendenti.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DipendentiRoutingModule } from './dipendenti-routing.module';

@NgModule({
	imports: [
		DipendentiRoutingModule,
        CommonModule,
		DipendentiComponent,
		ButtonModule
	],
	providers: [DipendentiService, MessageService],
})
export class DipendentiModule { }
