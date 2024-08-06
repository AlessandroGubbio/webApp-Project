import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/demo/service/login.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm!: FormGroup;
    subscription!: Subscription;

    constructor(
        public layoutService: LayoutService, 
        private formBuilder: FormBuilder, 
        private loginService: LoginService,
            private router: Router
    ) { }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.loginForm = this.formBuilder.group({
            mail: [null, Validators.required], 
            password: [null, Validators.required]
        })
    }

    executeLogin() {
        if(this.loginForm.valid) {
        this.subscription = this.loginService.callLoginService(this.loginForm.value).subscribe({
            next: (response) => {
                console.log(response)
                localStorage.setItem('loggedUser', JSON.stringify(response));
                this.router.navigate(['/']);
              }, 
              error: (errorResponse) => {
                alert('Errore di autenticazione. Verificare la console');
                console.log(errorResponse);
              }
            })
        } else {
            alert('Inserire tutti i dati necessari');
        }
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe;
    }
}
