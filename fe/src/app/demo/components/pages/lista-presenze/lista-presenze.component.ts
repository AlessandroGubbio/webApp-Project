import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { co } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PresenzeService } from 'src/app/demo/service/presenze.service';
import { Presenza } from 'src/app/dto/presenza.dto';

interface Month{
  name: string;
}

@Component({
  selector: 'app-lista-presenze',
  standalone: true,
  providers: [
    MessageService,
    PresenzeService
  ],
  imports: [
    TableModule,
    FormsModule,
    ToastModule,
    DragDropModule,
    DropdownModule,
    CommonModule,
    ButtonModule,
    CalendarModule,
    RouterLink
  ],
  templateUrl: './lista-presenze.component.html',
  styleUrl: './lista-presenze.component.scss'
})

export class ListaPresenzeComponent implements OnInit{
  presenza: Presenza[] = [];
  presenzaFull: Presenza[] = [];
  months: Month[];
  selectedMonth: string = "";
  selectedYear: string = "";
  searchTerm: string = "";
  presenzaCount: number = 0;
  displayAnno: Date = new Date()

  constructor(
    private messageService: MessageService, 
    private presenzeService: PresenzeService,
    private router: Router
) {}

  ngOnInit(): void {
    this.months = [
      {name : 'gennaio' },
      {name : 'febbraio' },
      {name : 'marzo' },
      {name : 'aprile' },
      {name : 'maggio' },
      {name : 'giugno' },
      {name : 'luglio' },
      {name : 'agosto' },
      {name : 'settembre'},
      {name : 'ottobre'},
      {name : 'novembre'},
      {name : 'dicembre'}
      
  ]
    
    this.selectedYear = new Date().getFullYear().toString()
    console.log(this.selectedYear)
    this.presenzeService.getPresenze().subscribe(
      presenza => {
        this.presenza = presenza
        this.presenzaFull = presenza,
        this.presenza.forEach((presenza) =>{
          presenza.data = new Date(presenza.data + 'T00:00:00')
        })
        this.selectedMonth = this.months[new Date().getMonth()].name
        this.presenza = this.presenza.filter(
          (presenza) => {
            const year = new Intl.DateTimeFormat('it-IT', { year:  "numeric"})
            .format(new Date(this.selectedYear));
            const monthName = new Intl.DateTimeFormat('it-IT', { month: 'long' })
            .format(new Date(presenza.data));
            if (monthName.toLowerCase().startsWith(this.months[new Date().getMonth()].name.toLowerCase()) 
                && Number(year) === presenza.data.getFullYear()) {
              this.presenzaCount++;
            }
            return monthName.toLowerCase().startsWith(this.months[new Date().getMonth()].name) && Number(year) === presenza.data.getFullYear() ;
          }
        
        );
        if(this.presenzaCount<1){
          this.messageService.add({ severity: 'info', detail: 'Nessuna presenza trovata per questo mese!'})
        }
      },
      error => console.log(error)
    )
  }

  onMonthChange(selectedMonth : any){
    this.presenzaCount = 0;
    this.selectedMonth = selectedMonth.value.name
    console.log(this.selectedYear)
    this.presenza = this.presenzaFull.filter(
        (presenza) => {
          const monthName = new Intl.DateTimeFormat('it-IT', { month: 'long' })
          .format(new Date(presenza.data));
          if (monthName.toLowerCase().startsWith(selectedMonth.value.name.toLowerCase()) && Number(this.selectedYear) === presenza.data.getFullYear()) {
            this.presenzaCount++;
          }
          return monthName.toLowerCase().startsWith(selectedMonth.value.name.toLowerCase()) && Number(this.selectedYear) === presenza.data.getFullYear();
        }
    );
    if(this.presenzaCount<1){
      this.messageService.add({ severity: 'info', detail: 'Nessuna presenza trovata per questo mese!'})
    }
}

  getDate(presenza: any){
    return new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(presenza)
  }

  calcoloTotaleOreLavorate(): number {
    if (!this.presenza || !this.presenza.length) {
      return 0; 
    }
  
    const totalHours = this.presenza.reduce((acc, presenza) => {
      const presenzaHours = parseFloat(presenza.totale);
      return acc + presenzaHours;
    }, 0);
  
    return totalHours;
  }

  calcoloTotaleOrePermessi(): number{
    if (!this.presenza || !this.presenza.length) {
      return 0; 
    }
    const totalPermessi = this.presenza.reduce((acc, presenza) => {
      const permessiHours = parseFloat(presenza.permesso);
      return acc + permessiHours;
    }, 0);
    return totalPermessi;
  }

  calcoloTotaleOreFerie(): number{
    if (!this.presenza || !this.presenza.length) {
      return 0; 
    }
    const totalFerie = this.presenza.reduce((acc, presenza) =>{
      const ferieHours = parseFloat(presenza.ferie);
      return acc + ferieHours;
    }, 0);
    
    return totalFerie;
  }

  formatTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    return `${hours}:${minutes}`;
  }

  deletePresenza(presenza: Presenza){
    this.presenzeService.deleteById(presenza.id_presenza).subscribe(
      {
        next: (res) => {
          const presenzaIndex = this.presenza.findIndex( u => u.id_presenza === presenza.id_presenza)
          if (presenzaIndex !== -1) {
            this.presenza.splice(presenzaIndex, 1);
            this.messageService.add({severity: 'info', detail: 'cancellazione avvenuta con successo'})
          }
        },
        error: (err) => {
          this.messageService.add({severity: 'error', detail: `Errore nella cancellazione.`})

        }
      }
    )
  }

  formatHours(decimalHours) {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
  
    let formattedTime = `${hours}h`;
    if (minutes !== 0) {
      formattedTime += ` ${minutes}m`;
    }
  
    return formattedTime;
  }

  onYearChange(selectedYear: any){
    this.selectedYear = selectedYear.getFullYear();
    const year = new Date(selectedYear)
    console.log("year " + year.getFullYear())
    console.log("month " + this.selectedMonth)

    this.presenzaCount = 0;
    this.presenza = this.presenzaFull.filter(
        (presenza) => {
          const monthName = new Intl.DateTimeFormat('it-IT', { month: 'long' })
          .format(new Date(presenza.data));
          if (monthName.toLowerCase().startsWith(this.selectedMonth.toLowerCase()) && Number(year.getFullYear()) === presenza.data.getFullYear()) {
            this.presenzaCount++;
          }
          return monthName.toLowerCase().startsWith(this.selectedMonth.toLowerCase()) && Number(year.getFullYear()) === presenza.data.getFullYear();
        }
    );
    if(this.presenzaCount<1){
      this.messageService.add({ severity: 'info', detail: 'Nessuna presenza trovata per questo mese!'})
    }

  }

}
