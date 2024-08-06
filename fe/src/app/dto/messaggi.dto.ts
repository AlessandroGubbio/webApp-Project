import { UserDto } from "./user.dto";

export interface Messaggi{
    idMessaggio : number;
    mittente: UserDto;
    destinatario: UserDto;
    titolo: string;
    testoMessaggio: string;
    testoRisposta: string;
    dataInvio: Date;
    dataRisposta: Date;
    status: boolean;
}

export class MessaggioClass{
    idMessaggio : number;
    mittente: UserDto;
    destinatario: UserDto;
    titolo: string;
    testoMessaggio: string;
    testoRisposta: string;
    dataInvio: Date;
    dataRisposta: Date;
    status: boolean;
}