import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoranService } from '../services/restoran.service';

import { Restoran } from '../models/restoran';
import { KorisnikService } from '../services/korisnik.service';
import { RezervacijaService } from '../services/rezervacija.service';

@Component({
  selector: 'app-neregistrovani-korisnik',
  templateUrl: './neregistrovani-korisnik.component.html',
  styleUrls: ['./neregistrovani-korisnik.component.css']
})
export class NeregistrovaniKorisnikComponent implements OnInit {

  broj_restorana!: number;
  broj_registrovanih_gostiju!: number;
  broj_rezervacija_u_24h!: number;
  broj_rezervacija_u_7d!: number;
  broj_rezervacija_u_1m!: number;
  restorani!: Restoran[];

  regexRestorani: Restoran[] = [];
  regexNaziv: string = "";
  regexAdresa: string = "";
  regexTip: string = "";

  sortiranje_opcija!: string;

  constructor(private router: Router,
                private restoranServis: RestoranService,
                  private korisnikServis: KorisnikService,
                    private rezervacijaServis: RezervacijaService)
  {}


  ngOnInit(): void {
    localStorage.removeItem('ulogovan')

    this.getData();
  }

  pretrazi(): void{
    this.regexRestorani.splice(0,this.regexRestorani.length);

    for(let i = 0; i < this.restorani.length; i++){
      if(this.restorani[i].ime.toLowerCase().includes(this.regexNaziv.toLowerCase())
          || this.restorani[i].adresa.toLowerCase().includes(this.regexAdresa.toLowerCase())
            || this.restorani[i].tip.toLowerCase().includes(this.regexTip.toLowerCase()))
      {
        this.regexRestorani.push(this.restorani[i]);

      }
    }
  }
  getData(): void{
    this.restoranServis.getBrojRestorana().subscribe(
      data=>{
        if(data == null){
          alert("GRESKA PRI DOHVATANJU BROJA RESTORANA");
        }
        else{
          this.broj_restorana = data;
        }
      }
    )


    this.korisnikServis.getBrojRegistrovanihGostiju().subscribe(
      data=>{
        if(data == null){
          alert("GRESKA PRI DOHVATANJU BROJA REGISTROVANIH GOSTIJU");
        }
        else{
          this.broj_registrovanih_gostiju = data;
        }
      }
    )

    this.rezervacijaServis.getBrojRezervacijaU24().subscribe(
      data=>{
        if(data == null){
          alert("GRESKA PRI DOHVATANJU BROJA REZERVACIJA U 24H");
        }
        else{
          this.broj_rezervacija_u_24h = data;
        }
      }
    )

    this.rezervacijaServis.getBrojRezervacijaU7().subscribe(
      data=>{
        if(data == null){
          alert("GRESKA PRI DOHVATANJU BROJA REGISTROVANIH GOSTIJU U 7D");
        }
        else{
          this.broj_rezervacija_u_7d = data;
        }
      }
    )

    this.rezervacijaServis.getBrojRezervacijaU1().subscribe(
      data=>{
        if(data == null){
          alert("GRESKA PRI DOHVATANJU BROJA REGISTROVANIH GOSTIJU U 1M");
        }
        else{
          this.broj_rezervacija_u_1m = data;
        }
      }
    )

    this.rezervacijaServis.getBrojRezervacijaU1().subscribe(
      data=>{
        if(data == null){
          alert("GRESKA PRI DOHVATANJU BROJA REGISTROVANIH GOSTIJU U 1M");
        }
        else{
          this.broj_rezervacija_u_1m = data;
        }
      }
    )

    this.restoranServis.getRestorani().subscribe(
      data=>{
        if(data == null){
          alert("GRESKA PRI DOHVATANJU RESTORANA");
        }
        else{
          this.restorani = data;
        }
      }
    )
  }


  sortiraj(po: string): void{
    switch(po){
      case 'IME':
        if(this.sortiranje_opcija == 'NERASTUCE'){
          this.restorani.sort((a, b) => a.ime.localeCompare(b.ime))
        }
        else{
          this.restorani.sort((a, b) => b.ime.localeCompare(a.ime))
        }
        break;
      case 'TIP':
        if(this.sortiranje_opcija == 'NERASTUCE'){
          this.restorani.sort((a, b) => a.tip.localeCompare(b.tip))
        }
        else{
            this.restorani.sort((a, b) => b.tip.localeCompare(a.tip))
        }
        break;
      case 'ADRESA':
        if(this.sortiranje_opcija == 'NERASTUCE'){
          this.restorani.sort((a, b) => a.adresa.localeCompare(b.adresa))
        }
        else{
            this.restorani.sort((a, b) => b.adresa.localeCompare(a.adresa))
        }
    }
  }


}
