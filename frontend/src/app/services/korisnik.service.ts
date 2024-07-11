import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { HttpClient } from '@angular/common/http';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  back: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  hashLozinka(lozinka: string): string{
    const hash = CryptoJS.SHA256(lozinka);
    return hash.toString(CryptoJS.enc.Hex);
  }

  proveriVelicinuSlike(path: string): boolean{
    if(path == ""){
      return true;
    }
    const img = new Image();
    img.src = path;
    if (img.complete) {
        const width = img.width;
        const height = img.height;
        return width >= 100 && width <= 300 && height >= 100 && height <= 300;
    } else {
        return false;
    }
  }

  login(korisnik: Korisnik){
    return this.http.post<Korisnik>(`${this.back}/korisnici/login`, korisnik);
  }

  register(korisnik: Korisnik){
    return this.http.post<boolean>(`${this.back}/korisnici/register`, korisnik);
  }

  azuriraj(korisnik: Korisnik, korisnicko_ime: string,  picSelected: boolean){
    return this.http.post<boolean>(`${this.back}/korisnici/azuriraj`, {korisnik: korisnik, staro_korisnicko_ime: korisnicko_ime, picSelected:picSelected });
  }

  deaktiviraj(korisnicko_ime: string){
    return this.http.post<boolean>(`${this.back}/korisnici/deaktiviraj`, { korisnicko_ime: korisnicko_ime });
  }

  prihvati(korisnicko_ime: string, status: string,){
    return this.http.post<boolean>(`${this.back}/korisnici/prihvati`, { korisnicko_ime: korisnicko_ime, status: status});
  }
  getKorisnik(korisnicko_ime: string){
    return this.http.post<Korisnik>(`${this.back}/korisnici/getKorisnik`, {korisnicko_ime: korisnicko_ime} );
  }
  getKorisnici(){
    return this.http.get<Korisnik[]>(`${this.back}/korisnici/getKorisnici`);
  }
  getKorisniciStatus(status: string){
    return this.http.post<Korisnik[]>(`${this.back}/korisnici/getKorisniciStatus`, {status: status} );
  }

  getBrojRegistrovanihGostiju(){
    return this.http.get<number>(`${this.back}/korisnici/getBrojRegistrovanihGostiju`);
  }
  getPitanje(korisnicko_ime: string){
    return this.http.post<string>(`${this.back}/korisnici/getPitanje`, {korisnicko_ime: korisnicko_ime} );
  }
  potvrdiOdgovor(korisnicko_ime: string, odgovor: string){
    return this.http.post<boolean>(`${this.back}/korisnici/potvrdiOdgovor`, {korisnicko_ime: korisnicko_ime, odgovor: odgovor} );
  }
  promeniLozinku(korisnicko_ime: string, lozinka: string){
    return this.http.post<boolean>(`${this.back}/korisnici/promeniLozinku`, {korisnicko_ime: korisnicko_ime, lozinka: lozinka} );
  }
  odsutanPenalty(korisnicko_ime: string){
    return this.http.post<boolean>(`${this.back}/korisnici/odsutanPenalty`, {korisnicko_ime: korisnicko_ime});
  }

  checkLozinka(korisnicko_imeP: string, lozinkaP: string){
    return this.http.post<boolean>(`${this.back}/korisnici/checkLozinka`, {korisnicko_ime: korisnicko_imeP, lozinka: lozinkaP} );
  }
}
