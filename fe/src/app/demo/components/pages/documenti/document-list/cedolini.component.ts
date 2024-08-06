import { Component, OnInit } from '@angular/core';
import { Cedolino } from 'src/app/dto/cedolino.dto';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CedoliniService } from 'src/app/demo/service/cedolini.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

interface Month {
    name: string;
}

@Component({
    selector: 'cedolini',
    templateUrl: './cedolini.component.html',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        ToastModule, 
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
        DropdownModule,
        TableModule],
    providers: [MessageService, CedoliniService]
})
export class CedoliniComponent implements OnInit{
    cedolino: Cedolino[] ;
    cedolinoFull: Cedolino[];
    months: Month[];
    selectedCedolini!: Cedolino[];
    selectedMonth: string;
    cedoliniCount: number;
    searchTerm: string = '';

    constructor(private cedoliniService: CedoliniService, private messageService: MessageService) {}

    ngOnInit() {

        this.months = [
            {name : 'tutti'},
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
        
        this.cedoliniService.getCedolini()
            .subscribe(
                data => { this.cedolino = data; 
                    this.cedoliniCount = data.length;
                    this.cedolinoFull = data;
                    this.cedolino.forEach((doc) =>{
                        doc.date = new Date(doc.date + 'T00:00:00')
                    })
                },
                error => {console.error('Error retrieving data: ', error)}      
            );
    }

    selectCedolino(cedolino: Cedolino) {
        this.messageService.add({ severity: 'info', summary: 'Data Selected'});
    }


    downloadPDF(pdfBase64: string) {
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${pdfBase64}`;
        link.download = 'cedolino.pdf';
        link.click();
    }

    hasCedolinos(): boolean {
        console.log(this.cedolino.length)
        return this.cedolino.length < 0;
      }

    
    onMonthChange(selectedMonth : any){
        if(selectedMonth.value.name != 'tutti'){
            this.cedoliniCount = 0;
            this.cedolino = this.cedolinoFull.filter(
                (doc) => {
                    const monthName = new Intl.DateTimeFormat('it-IT', { month: 'long' })
                    .format(new Date(doc.date));
                    if (monthName.toLowerCase().startsWith(selectedMonth.value.name.toLowerCase())) {
                        this.cedoliniCount++;
                    }
                    return monthName.toLowerCase().startsWith(selectedMonth.value.name.toLowerCase());
                }
              )
              
        }else{
            this.cedoliniCount = this.cedolinoFull.length;
            this.cedolino = this.cedolinoFull;
        }
        
    }

    getDate(cedolino: any){
        return new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(cedolino)
    }
}