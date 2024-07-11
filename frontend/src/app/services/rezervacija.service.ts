import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from '../models/rezervacija';

import { Message } from '../models/message';
import { Restoran } from '../models/restoran';
import { StringNumberPair } from '../models/stringNumberPair';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  back: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  getBrojRezervacijaU24(){
    return this.http.get<number>(`${this.back}/rezervacija/getBrojRezervacijaU24`);
  }
  getBrojRezervacijaU7(){
    return this.http.get<number>(`${this.back}/rezervacija/getBrojRezervacijaU7`);
  }
  getBrojRezervacijaU1(){
    return this.http.get<number>(`${this.back}/rezervacija/getBrojRezervacijaU1`);
  }
  rezervisi(rezervacija: Rezervacija){
    return this.http.post<Message>(`${this.back}/rezervacija/rezervisi`, rezervacija);
  }
  getBoja(restoran: string, datum_i_vreme: string, sto: number){
    return this.http.post<Message>(`${this.back}/rezervacija/getBoja`,
                {naziv_restorana: restoran, datum_i_vreme: datum_i_vreme, sto: sto});
  }
  getRezervacije(korisnicko_ime: string){
    return this.http.post<Rezervacija[]>(`${this.back}/rezervacija/getRezervacije`, {korisnicko_ime: korisnicko_ime});
  }

  oceniIDodajKomentar(rezervacija: Rezervacija){
    return this.http.post<boolean>(`${this.back}/rezervacija/oceniIDodajKomentar`, rezervacija);
  }
  otkaziRezervaciju(rezervacija: Rezervacija){
    return this.http.post<boolean>(`${this.back}/rezervacija/otkaziRezervaciju`, rezervacija);
  }

  potvrdiOdbijRezervaciju(rezervacija: Rezervacija){
    return this.http.post<boolean>(`${this.back}/rezervacija/potvrdiOdbijRezervaciju`, rezervacija);
  }

  getNeobradjeneRezervacije(restoraniP: string[]){

    return this.http.post<Rezervacija[]>(`${this.back}/rezervacija/getNeobradjeneRezervacije`, {restorani: restoraniP});
  }

  getPotvrdjeneRezervacije(korisnicko_imeP: string, restoraniP: string[]){
    return this.http.post<Rezervacija[]>(`${this.back}/rezervacija/getPotvrdjeneRezervacije`, {korisnicko_ime: korisnicko_imeP, restorani: restoraniP});
  }

  odsutanPrisutan(rezervacija: Rezervacija){
    return this.http.post<boolean>(`${this.back}/rezervacija/odsutanPrisutan`, rezervacija);
  }

  produzi(rezervacija: Rezervacija){
    return this.http.post<boolean>(`${this.back}/rezervacija/produzi`, rezervacija);
  }

  oslobodi(rezervacija: Rezervacija){
    return this.http.post<boolean>(`${this.back}/rezervacija/oslobodi`, rezervacija);
  }

  getBrojGostijuPoDanima(konobarP: string){
    return this.http.post<number[]>(`${this.back}/rezervacija/getBrojGostijuPoDanima`, {konobar: konobarP});
  }

  getPieInfo(restoranP: string){
    return this.http.post<StringNumberPair[]>(`${this.back}/rezervacija/getPieInfo`, {restoran: restoranP});
  }

  getBrojRezervacijaDaniUSedmici(restoranP: string){
    return this.http.post<number[]>(`${this.back}/rezervacija/getBrojRezervacijaDaniUSedmici`, {restoran: restoranP});
  }

  getProsecnaOcena(restoranP: string){
    return this.http.post<number>(`${this.back}/rezervacija/getProsecnaOcena`, {restoran: restoranP});
  }
}
