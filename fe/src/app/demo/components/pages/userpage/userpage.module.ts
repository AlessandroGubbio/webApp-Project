import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageRoutingModule } from './userpage-routing.module';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    ButtonModule,
    
  ],
  providers:[AppTopBarComponent]
})
export class UserpageModule { }
