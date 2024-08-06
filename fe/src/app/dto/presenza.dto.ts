export interface Presenza {
    id_presenza: number;
    data: Date;
    ingresso: string; 
    uscita: string;
    totale: string;
    permesso: string;
    ferie: string;
    progetto: Progetto;
  }

export interface Progetto{
    id_progetto: number;
    nome_cliente: string;
    titolo: string;
}

export class PresenzaClass{
    idUtente: number;
    data: Date;
    ingresso: string; 
    uscita: string;
    totale: number;
    permesso: number;
    ferie: number;
    idProgetto: number;
}