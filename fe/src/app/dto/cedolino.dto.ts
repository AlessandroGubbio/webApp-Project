import { User } from "./user.dto";

export interface Cedolino{
    id: number;
    date: Date;
    userId: User;
    pdfBase64: string;
}

export class DocDto{
    date: Date;
    userId: number;
    pdfBase64: String;
}

export class Progetto{
    id_progetto: number;
    titolo: string;
    nome_cliente: string;

}

export class ProgettoFull{
    id_progetto: number;
    titolo: string;
    nome_cliente: string;
    data_inizio: Date;
    data_fine: Date;
}
