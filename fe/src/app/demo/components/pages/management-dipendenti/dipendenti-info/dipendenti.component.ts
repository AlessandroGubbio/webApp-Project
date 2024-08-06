import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { DipendentiService } from 'src/app/demo/service/dipendenti.service';
import { LoginService } from 'src/app/demo/service/login.service';
import { User } from 'src/app/dto/user.dto';

@Component({
  selector: 'app-dipendenti',
  standalone: true,
  imports: [TableModule,
            FormsModule,
            ReactiveFormsModule,
            InputGroupModule,
            InputTextModule,
            ButtonModule,
            RouterLink,
            RouterModule,
            ToastModule

            

  ],
  providers: [MessageService],
  templateUrl: './dipendenti.component.html',
  styleUrl: './dipendenti.component.scss'
})
export class DipendentiComponent implements OnInit {
  users: User[] = [];
  usersFull: any[];
  searchTerm: string = '';
  subscription!: Subscription;
  date1: Date | undefined;


  constructor(
      private messageService: MessageService, 
      private loginService: LoginService,
      private dipendentiService: DipendentiService,
      private router: Router
  ) {}

  ngOnInit(): void {
      this.loginService.getAllUser().subscribe(
          user => {this.users = user, this.usersFull = [...user],  console.log(user)},
          error => console.log(error)
      )
  }

  searchUser() {
      if (this.searchTerm) {
        this.users = this.usersFull.filter(
          (user =>
            user.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.cognome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            user.mail.toLowerCase().includes(this.searchTerm.toLowerCase())
        ));
      } else {
        this.loginService.getAllUser().subscribe(
          user => {
            this.users = user;
          },
          error => console.log(error)
        );
      }
    }
    
  updateRecord(user: User): void {
    console.log('USER', user)
    this.loginService.updateInfo(user).subscribe(
      (updatedUser) => {
        console.log('User updated successfully', updatedUser);
        this.messageService.add({ severity: 'success', summary: 'Aggionato', detail: 'Utente aggiornato correttamente' });
      },
      (error) => {
        console.error('Error updating user', error);
        this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'Errore nella cancellazione utente' });
      }
    );
  }

  deleteRecord(user: User): void{
    console.log(user)
    this.loginService.deleteAccount(user.idUser).subscribe(
      (deletedUser) => {
        console.log(`Record with id: ${user.idUser} was deleted from database.`)
        const userIndex = this.users.findIndex(u => u.idUser === user.idUser);
        if (userIndex !== -1) {
          this.users.splice(userIndex, 1);
          this.messageService.add({ severity: 'success', detail: `Utente con id: ${user.idUser} cancellato.` });
        }
      },
      (error) => {
        console.error('Error while deleting record ', error)
        this.messageService.add({severity: 'error', detail: `Errore nella cancellazione per id: ${user.idUser}.`})
      }
    )
  }


  undoChanges(user: any) {
    const index = this.users.findIndex(u => u.idUser === user.idUser);
    const originalUser = this.usersFull[index];
    if (index !== -1) {
      this.users[index].nome = originalUser.nome;
      this.users[index].cognome = originalUser.cognome;
      this.users[index].mail = originalUser.mail;
    }
  }


  ngOnDestroy(): void {
      this.subscription?.unsubscribe;
  }
}

