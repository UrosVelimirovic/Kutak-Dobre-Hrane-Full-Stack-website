import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Restoran } from '../models/restoran';
import { Korisnik } from '../models/korisnik';
import { Jelo } from '../models/jelo';
import { CanvasPanel } from '../models/canvasPanel';

@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  back: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }


  getBrojRestorana(){
    return this.http.get<number>(`${this.back}/restoran/getBrojRestorana`);
  }

  getRestorani(){
    return this.http.get<Restoran[]>(`${this.back}/restoran/getRestorani`);
  }
  dodaj(restoran: Restoran){
    return this.http.post<boolean>(`${this.back}/restoran/dodaj`, restoran);
  }
  dodajJelo(restoran_ime: string, jelo: Jelo){
    return this.http.post<boolean>(`${this.back}/restoran/dodajJelo`, {restoran_ime: restoran_ime, jelo: jelo});
  }
  getJeloSlika(restoran_ime: string, jelo_ime: string){
    return this.http.post<string>(`${this.back}/restoran/getJeloSlika`, {restoran_ime: restoran_ime, jelo_ime: jelo_ime});
  }
  getCanvasPanel(restoran_imeP: string){
    return this.http.post<CanvasPanel>(`${this.back}/restoran/getCanvasPanel`, {restoran_ime: restoran_imeP});
  }
  getMyRestorani(korisnicko_imeP: string){
    return this.http.post<string[]>(`${this.back}/restoran/getMyRestorani`, {korisnicko_ime: korisnicko_imeP});
  }
  sendRestorani(korisnicko_imeP: string, restoranP: string){
    return this.http.post<boolean>(`${this.back}/restoran/sendRestorani`, {korisnicko_ime: korisnicko_imeP, restoran: restoranP});
  }

  dodajKomentar(korisnicko_imeP: string, restoranP: string, komentarP: string){
    return this.http.post<boolean>(`${this.back}/restoran/dodajKomentar`, {korisnicko_ime: korisnicko_imeP, restoran: restoranP, komentar: komentarP});

  }
}


