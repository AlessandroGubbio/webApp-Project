import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { s } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { PresenzeService } from 'src/app/demo/service/presenze.service';
import { ProgettiService } from 'src/app/demo/service/progetti.service';
import { Progetto } from 'src/app/dto/cedolino.dto';
import { PresenzaClass } from 'src/app/dto/presenza.dto';
import { User } from 'src/app/dto/user.dto';

interface DateInfo {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CalendarModule, 
    FormsModule,
    SliderModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
  providers: [ProgettiService, MessageService, PresenzeService]
})
export class CalendarioComponent implements OnInit {

  userString: string = localStorage.getItem('loggedUser')
  userdto: User | null = null

  dateIngresso: Date | undefined;
  dateUscita: Date | undefined;
  selectedDate = new Date();
  selectedYear = this.selectedDate.getFullYear();
  permessi: number = 0;
  ferie: number = 0;


  check: boolean = false;
  saturday: boolean = false;

  progetti: Progetto[];

  presenza: PresenzaClass = new PresenzaClass();

  progettiName: any[] = [];

  selectedProgetto: string;
  selectedProgettoId: number;

  constructor(private progettiService: ProgettiService, private presenzeService: PresenzeService, private messageService: MessageService){}

  generateCalendar() {
    const date = new Date(this.selectedYear, this.selectedDate.getMonth());
    const firstDay = date.getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    let day = 1;
    const calendar: DateInfo[][] = [];
    let currentRow: DateInfo[] = [];
    for (let i = 0; i < firstDay; i++) {
      currentRow.push({ day: 0, isCurrentMonth: false, isToday: false });
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dateInfo: DateInfo = {
        day: day,
        isCurrentMonth: date.getMonth() === this.selectedDate.getMonth(),
        isToday: day === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear(),
      };
      currentRow.push(dateInfo);
  
      if (currentRow.length === 7 || (day === daysInMonth )) {
        calendar.push(currentRow);
        currentRow = [];
      }
    }
  
    return calendar;
  }

  ngOnInit() {
    this.userdto = JSON.parse(this.userString) as User;
    
    this.progettiService.getProgetti().subscribe(
      {
        next: (progetti) => { this.progetti = progetti; 
          for(let i= 0; i<this.progetti.length; i++){
            this.progettiName.push({ "name" : this.progetti[i].titolo, "id" : this.progetti[i].id_progetto})
          }  
        }
      }
    )
    this.saturdayCheck()
    this.checkPresenza();
  }

  checkPresenza(){
    this.check = false;
    this.presenzeService.checkDate(this.userdto.idUser, this.selectedDate).subscribe(
      {
        next: (presenza)=> {
          console.log(presenza)
          if(presenza.data !== null){
            this.check = true;
            this.dateIngresso = this.stringToDate(presenza.ingresso)
            this.dateUscita = this.stringToDate(presenza.uscita)
            this.permessi = Number(presenza.permesso)
            this.ferie = Number(presenza.ferie)
          }
          else{
            this.dateIngresso = new Date(2024, 6, 19, 9, 0)
            this.dateUscita = new Date(2024, 6, 19, 18, 0)
          }
        },
      }
    );

  }

  getDate(presenza: any){
    return new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(presenza)
  }

  previousMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.selectedYear = this.selectedDate.getFullYear();
    this.generateCalendar();
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1)
    if(this.selectedDate.getMonth() == new Date().getMonth() && this.selectedYear == new Date().getFullYear()){
      this.selectedDate = new Date()
    }
    this.checkPresenza()
  }
  
  nextMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    if (this.selectedDate.getMonth() === 0) { 
      this.selectedYear++;
    }
    this.selectedYear = this.selectedDate.getFullYear();
    this.generateCalendar();
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1)
    if(this.selectedDate.getMonth() == new Date().getMonth() && this.selectedYear == new Date().getFullYear()){
      this.selectedDate = new Date()
    }
    this.checkPresenza()
  }

  onDateSelect(dayInfo: DateInfo) {
    if (dayInfo.day !== 0) { 
      const selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), dayInfo.day);
      this.selectedDate = selectedDate;
      this.saturdayCheck()
      this.checkPresenza();
    }
  }

  saturdayCheck(){
    if(this.selectedDate.getDay() === 6){
      this.saturday = true
    }else{
      this.saturday = false
    }
  }

  onProgettoChange(selectedProgetto: any){
    this.selectedProgettoId = selectedProgetto.value.id

  }

    
  submitData(){
    if(this.selectedDate.getDay() !== 0){
      this.presenza.data = this.selectedDate;
      this.presenza.idUtente = this.userdto.idUser;
      if(this.dateIngresso !== undefined && this.dateUscita !== undefined && this.selectedProgettoId != undefined){
        this.presenza.ingresso = this.dateIngresso.toLocaleTimeString()
        this.presenza.uscita = this.dateUscita.toLocaleTimeString()
        this.presenza.ferie = this.ferie;
        this.presenza.permesso = this.permessi;
        this.presenza.idProgetto = this.selectedProgettoId
        this.presenzeService.savePresenza(this.presenza).subscribe(
          {
            next: (data) => {
              console.log(data);
              if(!this.check){
                this.messageService.add({ severity: 'success', detail: 'Presenza inserita correttamente' });
              }else{
                this.messageService.add({ severity: 'info', detail: 'Presenza aggiornata!'})
              }
            },
            error: (e) =>{
              console.log(e);
              this.messageService.add({ severity: 'error', detail: 'Si è verificato un errore' });
            }
          }
        )
      }else{
        this.messageService.add({ severity: 'error', detail: 'Inserire l\'orario di ingresso, di uscita ed il Progetto prima di continuare' });
      }
    }else{
      this.messageService.add({ severity: 'error', detail: 'Impossibile registrare una presenza per la domenica'})
    }
    
  }

stringToDate(timeString: string): Date {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const day = new Date();
  day.setHours(0, 0, 0, 0);
  day.setHours(hours);
  day.setMinutes(minutes);
  day.setSeconds(seconds);

  return day;
}
}
