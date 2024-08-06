import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { LoginService } from '../demo/service/login.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private loginService: LoginService) { }

    ngOnInit() {
        const id = JSON.parse(localStorage.getItem('loggedUser')).idUser
        
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'News',
                items: [
                    { label: 'Novità', icon: 'pi pi-fw pi-book', routerLink: ['/pages/news'] },
                    { label: 'Pubblica', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/pages/post'] },
                ]
            },
            {
                label: 'Area riservata',
                items: [
                    { label: 'Buste Paga', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/pages/cedolini'] },
                    { label: 'Calendario', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/calendario'] },
                    { label: 'Lista Presenze', icon: 'pi pi-fw pi-history', routerLink: ['/pages/lista-presenze'] },
                    { label: 'Messaggi', icon: 'pi pi-fw pi-envelope', routerLink: ['pages/messaggi']}                ]
            }
        ];
        this.loginService.checkAdmin(id).subscribe(
            {
                next: (data) => {
                    data.forEach(
                        (element) => {
                            if (element.name.includes('ADMIN') ){
                                this.model.push(
                                    {
                                        label: 'Admin',
                                        items: [
                                            { label: 'Assegna Documento', icon: 'pi pi-fw pi-file-import', routerLink: ['/pages/insert-document'] },
                                            { label: 'Management Progetti', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages/management-progetti'] },
                                            { label: 'Management Dipendenti', icon: 'pi pi-fw pi-users', routerLink: ['/pages/dipendenti'] },
                                            { label: 'Management News', icon: 'pi pi-fw pi-list', routerLink: ['/pages/news-list'] },
                                        ]
                                    }
                                )
                            }
                            
                        }
                    )
                }
            }
        )
    }
}
