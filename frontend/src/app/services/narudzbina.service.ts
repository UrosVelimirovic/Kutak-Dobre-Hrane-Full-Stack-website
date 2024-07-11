import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Narudzbina } from '../models/narudzbina';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class NarudzbinaService {


  back: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  naruci(narudzbina: Narudzbina){
    return this.http.post<boolean>(`${this.back}/narudzbina/naruci`, {narudzbina: narudzbina});
  }

  getMyNarudzbine(korisnicko_imeP: string){
    const data = {
      korisnicko_ime: korisnicko_imeP
    }
    return this.http.post<Narudzbina[]>(`${this.back}/narudzbina/getMyNarudzbine`, data);

  }

  getNarudzbineFromRestoran(restoraniP: string[]){
    return this.http.post<Narudzbina[]>(`${this.back}/narudzbina/getNarudzbineFromRestoran`, {restorani: restoraniP});
  }


  potvrdiNarudzbinu(narudzbinaP: Narudzbina){
    return this.http.post<boolean>(`${this.back}/narudzbina/potvrdiNarudzbinu`, narudzbinaP);
  }

  primljenaNarudzbina(narudzbinaP: Narudzbina){
    return this.http.post<boolean>(`${this.back}/narudzbina/primljenaNarudzbina`, narudzbinaP);
  }
}
