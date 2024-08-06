import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/demo/service/register.service';
import { UserDto, UserProfile } from 'src/app/dto/user.dto';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService],
    styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {

    registerForm!: FormGroup;
    subscription!: Subscription;
    selectedFile: File | null = null;
    showFile = false;
    user: UserProfile = new UserProfile;

    constructor(
        public layoutService: LayoutService, 
        private formBuilder: FormBuilder, 
        private registerService: RegisterService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm() {
        this.registerForm = this.formBuilder.group({
            mail: [null, Validators.required], 
            nome: [null, Validators.required], 
            cognome: [null, Validators.required], 
            password: [null, Validators.required]
        })
    }


    executeRegister() {
        if(this.registerForm.valid){
        this.user.mail = this.registerForm.value.mail
        this.user.nome = this.registerForm.value.nome
        this.user.cognome = this.registerForm.value.cognome
        this.user.password = this.registerForm.value.password
        this.subscription = this.registerService.callRegisterService(this.user).subscribe({
            next: (response) => {
                console.log("success")
                this.router.navigate(['/auth/login']);
                }, 
                error: (errorResponse) => {
                alert('Errore nella registrazione. Verificare la console');
                console.error('Error during registration:', errorResponse);
                }
            })
        } else {
            alert('Inserire tutti i dati necessari');
        }
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        this.showFile = true
        const file = event.target.files[0];
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.user.image = reader.result as string;
            this.user.image = this.user.image?.replace( 'data:image/jpeg;base64,', '' );
            console.log(this.user.image)
        };
      }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe;
    }
}
