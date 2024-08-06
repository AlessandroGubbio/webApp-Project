import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MessageService} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessaggiRoutingModule } from './messaggi-routing.module';
import { MessaggiComponent } from './messaggi.component';
import { MessaggiService } from 'src/app/demo/service/messaggi.service';
import localeIt from '@angular/common/locales/it';

@NgModule({
	imports: [
		MessaggiRoutingModule,
        CommonModule,
		MessaggiComponent,
		ButtonModule
	],
	providers: [MessageService, DatePipe],
})
export class MessaggiModule { }
