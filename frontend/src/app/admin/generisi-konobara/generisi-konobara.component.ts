import { Component, OnInit } from '@angular/core';
import { BlobUtils } from '../../tools/blob';
import { Router } from '@angular/router';
import { KorisnikService } from '../../services/korisnik.service';
import { RestoranService } from 'src/app/services/restoran.service';

@Component({
  selector: 'app-generisi-konobara',
  templateUrl: './generisi-konobara.component.html',
  styleUrls: ['./generisi-konobara.component.css']
})
export class GenerisiKonobaraComponent implements OnInit {

  korisnicko_ime: string = "";
  lozinka: string  = "";
  bezbednosno_pitanje:string  = "";
  odgovor: string  = "";
  ime: string  = "";
  prezime: string  = "";
  pol: string  = "";
  adresa: string  = "";
  kontakt_telefon: string  = "";
  email: string  = "";
  profilna_slika: string = "";
  profilna_slika_path: string = "";
  broj_kreditne_kartice: string  = "";
  tip: string  = "";
  status: string  = "";
  restorani: string  = "";

  slikaMessage: string  = "";
  sifraMessage: string  = "";

  constructor(private router: Router,
                private korisnikServis: KorisnikService,
                  private restoranServis: RestoranService){}

  ngOnInit(): void {

  }


  izaberiSliku(event: any): void{
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.profilna_slika_path = URL.createObjectURL(selectedFile);

      fetch(this.profilna_slika_path)
        .then(response => response.blob())
        .then(blob => BlobUtils.convertBlobToBase64(blob))
        .then(base64String => {
          this.profilna_slika = base64String;
        })
        .catch(error => console.error('SLIKA NIJE USPELA DA SE PREVEDE U STRING'));
    }
  }

  register(): void{

    if(this.korisnikServis.proveriVelicinuSlike(this.profilna_slika_path) == false){
      this.slikaMessage = "Slika mora biti izmedju 100x100 i 300x300 piksela";
      return;
    }
    else{
      this.slikaMessage = "";
    }
    if(this.regex(this.lozinka) == false){
      return;
    }

    let korisnik = {
      korisnicko_ime: this.korisnicko_ime,
      lozinka: this.lozinka,
      bezbednosno_pitanje: this.bezbednosno_pitanje,
      odgovor: this.odgovor,
      ime: this.ime,
      prezime: this.prezime,
      pol: this.pol,
      adresa: this.adresa,
      kontakt_telefon: this.kontakt_telefon,
      email: this.email,
      profilna_slika: this.profilna_slika,
      broj_kreditne_kartice: this.broj_kreditne_kartice,
      tip: "KONOBAR",
      status: "PRIHVACEN",
      brojac_nepojavljivanja: 0,
    }

    let plainLozinka = korisnik.lozinka;
    korisnik.lozinka = this.korisnikServis.hashLozinka(plainLozinka);

    this.korisnikServis.register(korisnik).subscribe(
      data=>{
        if(data == true){
          this.sendRestorani(0);
          alert("uspesna registracija");
        }
        else{
          alert("GRESKA PRI REGISTROVANJU(Korisnicko ime vec postoji)");
        }
      }
    )
  }

  sendRestorani(index: number): void{
    let temp: string[] = this.restorani.split(',')
    if(index == temp.length){
      return;
    }
    this.restoranServis.sendRestorani(this.korisnicko_ime, temp[index]).subscribe(
      data=>{
        if(data == true){
          this.sendRestorani(index+1);
        }
      }
    )
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
