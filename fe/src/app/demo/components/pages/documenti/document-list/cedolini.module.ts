import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CedoliniComponent } from './cedolini.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CedoliniRoutingModule } from './cedolini-routing.module';
import { CedoliniService } from 'src/app/demo/service/cedolini.service';

@NgModule({
	imports: [
		TableModule, 
		CedoliniRoutingModule,
        FormsModule, 
        CommonModule,
		CedoliniComponent
	],
	providers: [CedoliniService],
})
export class CedoliniModule { }
