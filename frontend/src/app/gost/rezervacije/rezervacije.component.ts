import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/models/korisnik';
import { Rezervacija } from 'src/app/models/rezervacija';
import { RezervacijaService } from 'src/app/services/rezervacija.service';
import { RestoranService } from 'src/app/services/restoran.service';

@Component({
  selector: 'app-rezervacije',
  templateUrl: './rezervacije.component.html',
  styleUrls: ['./rezervacije.component.css']
})
export class RezervacijeComponent implements OnInit {


  rezervacije!: Rezervacija[];
  korisnik!: Korisnik;

  displayTextInput: boolean = false;
  editedRezervacija!: Rezervacija;
  novaOcena!: number;
  noviKomentar!: string;
  message!: string;
  constructor(private rezervacijaServis: RezervacijaService,
              private restoranServis: RestoranService
  ){

  }

  ngOnInit(): void {
      this.loadKorisnik();
      this.getRezervacije();
  }

  loadKorisnik(): void {
    const korisnikData = localStorage.getItem('ulogovan');
    if (korisnikData) {
      this.korisnik = JSON.parse(korisnikData);
      if (this.korisnik && this.korisnik.profilna_slika) {
        this.korisnik.profilna_slika = 'data:image/png;base64,' + this.korisnik.profilna_slika;
      }
    }
  }

  getRezervacije(): void{
    this.rezervacijaServis.getRezervacije(this.korisnik.korisnicko_ime).subscribe(
      data=>{
        this.rezervacije = data;
        this.rezervacije.sort((a,b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());
      }
    )
  }

  dodajKomentarIOcenu(rezervacija: Rezervacija): void{
    this.displayTextInput = true;
    this.editedRezervacija = rezervacija;
    this.novaOcena = 0;
    this.noviKomentar = ""
  }

  oceniIDodajKomentar(): void{
    this.editedRezervacija.ocena = this.novaOcena
    this.editedRezervacija.komentar = this.noviKomentar
    this.rezervacijaServis.oceniIDodajKomentar(this.editedRezervacija).subscribe(
      data=>{
        this.restoranServis.dodajKomentar(this.korisnik.korisnicko_ime, this.editedRezervacija.naziv_restorana, this.noviKomentar).subscribe(
          data=>{

          }
        )
      }
    )
  }

  otkazi(rezervacija: Rezervacija): void{
    let minuteDifference = (new Date().getTime() - new Date(rezervacija.datum).getTime()) / 1000 / 60;

    if(minuteDifference < 45){
      this.message = "Ne mozete otkazati ovu rezervaciju"
      return;
    }
    this.message = ""
    rezervacija.status = "OTKAZANA";
    this.rezervacijaServis.otkaziRezervaciju(rezervacija).subscribe(
      data=>{
        alert(data)
      }
    )

  }
}
