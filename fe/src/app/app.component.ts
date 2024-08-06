import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { User, UserDto } from './dto/user.dto';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    userString: string = localStorage.getItem('loggedUser')
    userdto: User | null = null

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.userdto = JSON.parse(this.userString) as User;
    }
}
