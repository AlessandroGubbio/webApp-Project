import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DipendentiService } from 'src/app/demo/service/dipendenti.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DipendentiDocsRoutingModule } from './dipendenti-docs-routing.module';
import { DipendentiDocsComponent } from './dipendenti-docs.component';
import { CedoliniService } from 'src/app/demo/service/cedolini.service';

@NgModule({
	imports: [
		DipendentiDocsRoutingModule,
        CommonModule,
		DipendentiDocsComponent,
		ButtonModule
	],
	providers: [DipendentiService, CedoliniService, MessageService],
})
export class DipendentiDocsModule { }
