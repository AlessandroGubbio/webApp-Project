import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalInterceptor } from './demo/service/interceptors/portal.interceptor';
import { NewsService } from './demo/service/news.service';
import { CedoliniService } from './demo/service/cedolini.service';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { AppLayoutModule } from './layout/app.layout.module';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        RouterModule,
        ReactiveFormsModule,
        BrowserModule,
        TooltipModule
    ],
    providers: [
        { 
            provide: LocationStrategy, 
            useClass: HashLocationStrategy 
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: PortalInterceptor,
            multi: true
        },
        IconService, 
        NodeService,
        NewsService,
        CedoliniService
    ],
    exports: [
        ReactiveFormsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
