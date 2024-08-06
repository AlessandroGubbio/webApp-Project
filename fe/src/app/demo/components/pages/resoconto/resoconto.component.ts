import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { endWith, from } from 'rxjs';
import { PresenzeService } from 'src/app/demo/service/presenze.service';
import { Presenza } from 'src/app/dto/presenza.dto';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Scale } from 'chart.js';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-resoconto',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ChartModule,
    DropdownModule,
    FormsModule,
    CalendarModule
  ],
  templateUrl: './resoconto.component.html',
  styleUrl: './resoconto.component.scss',
  animations: [
    trigger('monthChange', [
      transition('* => *', [
        style({ opacity: 0, transform: 'scale(0.9) translateY(5px)'}), 
        animate('300ms ease-in-out', style({ opacity: 1, transform: ' translateY(5px) scale(1.2)' })), 
        animate('200ms ease-in-out', style({ opacity: 1, transform: ' translateY(5px) scale(1)' })) 
      ])
    ])
  ]
})
export class ResocontoComponent implements OnInit {

  data: any;

  selectedMonth: any;
  selectedYear: any;

  presenzeOre: number[]= []

  presenze: Presenza[] = [];
  presenzeFull: Presenza[] = [];

  monthDays: number[] = [];

  workHours: number[] = [];

  options: any;

  months: any;

  totalWorkedHours: number = 0;
  totalPermessiHours: number = 0;
  totalFerieHours: number = 0;
  

  constructor(private presenzeService: PresenzeService) { }

  ngOnInit() {
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
      
    ],
    this.selectedMonth = this.months[new Date().getMonth()].name;
    const year = new Date()
    const yearNumber = year.getFullYear()
    console.log(yearNumber)
    this.selectedYear = new Date().getFullYear().toString()
    this.fetchData();  

  }


  async fetchData(){
    const currentMonth = new Intl.DateTimeFormat('it-IT', { month: 'numeric' })
    .format(new Date());
    const currentYear = new Intl.DateTimeFormat('it-IT', { year:  "numeric"})
    .format(new Date());
    const presenza = await this.presenzeService.getData();
    this.presenzeFull = presenza;
    this.presenze = presenza
    this.presenze.forEach((presenza) =>{
      presenza.data = new Date(presenza.data + 'T00:00:00')
      }),
      this.presenze =  this.presenze.filter( (presenza)=>{
        const year = new Intl.DateTimeFormat('it-IT', { year:  "numeric"})
        .format(new Date());
        const monthName = new Intl.DateTimeFormat('it-IT', { month: 'long' })
        .format(new Date());
        return monthName.toLowerCase().startsWith(this.months[presenza.data.getMonth()].name) && Number(year) === presenza.data.getFullYear()
      });
      let currentDay = 1;
      for (let i = 0; i < this.presenze.length; i++) {
        while (currentDay < this.presenze[i].data.getDate()) {
          this.monthDays.push(currentDay);
          this.workHours.push(0);
          currentDay++;
        }
        this.monthDays.push(currentDay);
        this.workHours.push(Number(this.presenze[i].totale));
        this.totalWorkedHours += Number(this.presenze[i].totale)
        console.log(this.presenze[i].ferie)
        this.totalFerieHours += Number(this.presenze[i].ferie)
        this.totalPermessiHours += Number(this.presenze[i].permesso)

        currentDay++;
      }
      while (currentDay-1 <= this.getDaysInMonth(currentYear, currentMonth)) {
        this.monthDays.push(currentDay);
        this.workHours.push(0);
        currentDay++;
      }

    this.cartesiano()
    
  }

  getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  

  onMonthChange(selectedMonth : any){
    this.monthDays.length = 0;
    this.selectedYear = this.selectedYear
    this.totalWorkedHours = 0;
    this.totalFerieHours = 0;
    this.totalPermessiHours = 0;
    console.log(this.selectedYear)

    // riempire monthDays con il nuovo mese
    for(let i =0; i< this.getDaysInMonth(Number(this.selectedYear), this.months.findIndex(month => selectedMonth.value.name === month.name)); i++){
      this.monthDays.push(i+1)
    }
    this.selectedMonth = selectedMonth.value.name
    console.log(this.selectedMonth)
    // filtrare per il nuovo mese

    this.presenze = this.presenzeFull.filter(
      (presenza) => {
        const monthName = new Intl.DateTimeFormat('it-IT', { month: 'long' })
          .format(new Date(presenza.data));
          return monthName.toLowerCase().startsWith(selectedMonth.value.name.toLowerCase()) && Number(this.selectedYear) === presenza.data.getFullYear();
      }
    )

    // update dell'array delle ore lavorate per il nuovo mese
    this.workHours.length = 0
    let currentDay = 1;
      for (let i = 0; i < this.presenze.length; i++) {
        while (currentDay < this.presenze[i].data.getDate()) {
          
          this.workHours.push(0);
          currentDay++;
        }
        
        this.workHours.push(Number(this.presenze[i].totale));
        this.totalWorkedHours += Number(this.presenze[i].totale)
        this.totalFerieHours += Number(this.presenze[i].ferie)
        this.totalPermessiHours += Number(this.presenze[i].permesso)
        currentDay++;
      }
      while (currentDay  <= this.getDaysInMonth(this.selectedYear, this.months.findIndex(month => selectedMonth.value.name === month.name))) {
       
        this.workHours.push(0);
        currentDay++;

      }

    // riempire nuovamente il cartesiano con le nuove x e dati filtrati
    
    this.cartesiano()
  }

  onYearChange(selectedYear: any){
    this.totalWorkedHours = 0;
    this.totalFerieHours = 0;
    this.totalPermessiHours = 0;
    const year = new Date(selectedYear).getFullYear().toString()
    this.selectedYear = year

    // riempire il monthdays per i giorni di quell'anno

    
    this.monthDays.length = 0
    for(let i =0; i< this.getDaysInMonth(year, this.months.findIndex(month => this.selectedMonth === month.name)); i++){
      this.monthDays.push(i+1)
    }
    
    this.presenze = this.presenzeFull.filter(
      (presenza) => {
        const monthName = new Intl.DateTimeFormat('it-IT', { month: 'long' })
        .format(new Date(presenza.data));
        return monthName.toLowerCase().startsWith(this.selectedMonth.toLowerCase()) && Number(year) === presenza.data.getFullYear();
      }
    )
  

    this.workHours.length = 0
    let currentDay = 1;
      for (let i = 0; i < this.presenze.length; i++) {
        while (currentDay < this.presenze[i].data.getDate()) {
          
          this.workHours.push(0);
          currentDay++;
        }
        
        this.workHours.push(Number(this.presenze[i].totale));
        this.totalWorkedHours += Number(this.presenze[i].totale)
        this.totalFerieHours += Number(this.presenze[i].ferie)
        this.totalPermessiHours += Number(this.presenze[i].permesso)
        currentDay++;
      }
      while (currentDay  <= this.getDaysInMonth(this.selectedYear, this.months.findIndex(month => this.selectedMonth === month.name))) {
       
        this.workHours.push(0);
        currentDay++;

      }

    this.cartesiano()
    
  }



  cartesiano(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.monthDays,
      datasets: [
          {
              label: 'Ore di Lavoro',
              data: this.workHours,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--gray-500'),
              backgroundColor: documentStyle.getPropertyValue('--gray-500'),
              tension: 0.1
          },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.9,
      animations: {
        tension:{
          duration: 1000,
          easing: 'linear',
          from: 0,
          to: 0.1,
        },
        y: {
          from: 600
        }
      },
      plugins: {
          legend: {
              labels: {
                  color: textColor,
                  boxWidth: 20,
                      
              }
          }
      },
      scales: {
          x: {
            title: {
              color: textColor,
              display: true,
              text: 'GIORNO'
              },
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: true
              }
          },
          y: {
            beginAtZero: true,
            max: 10,
            title: {
              color: textColor,
              display: true,
              text: 'ORE'
              },
              ticks: {
                  stepSize: 1,
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: true
              }
          }
        }
    };
  }


}
