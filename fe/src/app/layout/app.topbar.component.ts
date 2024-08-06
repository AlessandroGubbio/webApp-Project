import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { User, UserDto } from '../dto/user.dto';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];
    userdto: User | null = null
    userString: string = localStorage.getItem('loggedUser')

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, public router: Router) { }


    ngOnInit(): void {
        this.userdto = JSON.parse(this.userString) as User;
    }

    update(user: User){
        this.userdto = user
        console.log('called', this.userdto)
    }


    logout(){
        localStorage.removeItem('loggedUser');
    }

}
