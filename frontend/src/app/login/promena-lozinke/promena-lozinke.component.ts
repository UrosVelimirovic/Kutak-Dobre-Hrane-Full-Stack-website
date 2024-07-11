import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit{

  korisnicko_ime!: string;
  pitanje: string = "";
  odgovor: string | null = null;
  lozinka1!: string;
  lozinka2!: string;
  pogresan_odgovor_message: string | null= null;
  lozinke_nisu_iste_message: string | null = null;
  sifraMessage!: string;

  faza: number = 1;
  constructor(private korisnikServis: KorisnikService){}

  ngOnInit(): void {

  }

  potvrdi(){
    if(this.faza == 1){
      this.korisnikServis.getPitanje(this.korisnicko_ime).subscribe(
        data=>{
          this.pitanje = data;
          if(data != null){
            this.faza = 2;
          }
        }
      )
    }
    else if(this.faza == 2){
      this.korisnikServis.potvrdiOdgovor(this.korisnicko_ime, this.odgovor as string).subscribe(
        data=>{
          if(data == true){
            this.pogresan_odgovor_message = "";
            this.faza = 3;
          }
          else{
            this.pogresan_odgovor_message = "Pogresan Odgovor";
          }
        }
      )
    }
    else if(this.faza == 3){
      if(this.lozinka1 == this.lozinka2)
      {
        this.lozinke_nisu_iste_message = ""
        if(this.regex(this.lozinka1)){
          let lozinka: string = this.korisnikServis.hashLozinka(this.lozinka1);
          this.korisnikServis.promeniLozinku(this.korisnicko_ime, lozinka).subscribe(
            data=>{
              if(data == true){
                alert("Lozinka uspesno promenjena!")
              }
              else{
                alert("Doslo je do greske.")
              }
              this.faza = 1;
            }
          )
        }
      }else{
        this.lozinke_nisu_iste_message = "Lozinke moraju biti iste"
      }

    }
  }

  regex(sifra: string): boolean{
    let min6max10: RegExp = /^.{6,10}$/;
    let bar_jedno_veliko_slovo: RegExp = /^(?=.*[A-Z])/;
    let bar_jedan_broj: RegExp =  /^(?=.*\d)/;
    let bar_jedan_specijalni_karakter = /^(?=.*[\W_])/;
    let bar_tri_mala_slova = /^(?=(?:.*[a-z]){3})/;
    let pocetno_slovo = /^[a-zA-Z]/;

    if(min6max10.test(sifra) == false){
      this.sifraMessage = "Sifra mora biti izmedju 6 i 10 karaktera";
      return false;
    }
    if(bar_jedno_veliko_slovo.test(sifra) == false){
      this.sifraMessage = "Sifra mora imati bar jedno veliko slovo";
      return false;
    }
    if(bar_jedan_broj.test(sifra) == false){
      this.sifraMessage = "Sifra mora imati bar jedan broj";
      return false;
    }
    if(bar_jedan_specijalni_karakter.test(sifra) == false){
      this.sifraMessage = "Sifra mora sadrzati bar jedan specijalni karakter";
      return false;
    }
    if(bar_tri_mala_slova.test(sifra) == false){
      this.sifraMessage = "Sifra mora imati bar tri mala slova";
      return false;
    }
    if(pocetno_slovo.test(sifra) == false){
      this.sifraMessage = "Pocetni karakter u sifri mora biti slovo";
      return false;
    }
    this.sifraMessage = "";
    return true;

  }
}
