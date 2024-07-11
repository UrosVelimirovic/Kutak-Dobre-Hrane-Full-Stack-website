import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { BlobUtils } from 'src/app/tools/blob';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  korisnik!: Korisnik;


  korisnicko_ime!: string;
  lozinka: string = "NONE";
  bezbednosno_pitanje!: string;
  odgovor!: string;
  ime!: string;
  prezime!: string;
  pol!: string;
  adresa!: string;
  kontakt_telefon!: string;
  email!: string;
  profilna_slika: string = "";
  profilna_slika_path: string = "NULA";
  broj_kreditne_kartice!: string;
  tip!: string;
  status!: string;
  staro_korisnicko_ime!: string;

  slikaMessage!: string;
  sifraMessage!: string;


  azuriraj: boolean = false;
  promenaLozinke: boolean = false;

  stara_lozinka!: string;
  nova_lozinka!: string;
  ponovljena_nova_lozinka!: string;

  constructor(private korisnikServis: KorisnikService,
                private router: Router)
  {}

  ngOnInit(): void {
      this.loadKorisnik();
      this.staro_korisnicko_ime = this.korisnik.korisnicko_ime;
      this.unpack();
  }

  azurirajFlag(){
    this.azuriraj = true;
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

  azurirajFoo(): void{
    this.pack();
    let picSelected: boolean = false;
    if(this.profilna_slika_path != "NULA"){
      picSelected = true;
    }
    this.korisnikServis.azuriraj(this.korisnik, this.staro_korisnicko_ime, picSelected).subscribe(
      data=>{
        if(data != null){

          this.korisnikServis.getKorisnik(this.korisnik.korisnicko_ime).subscribe(
            data2=>{
              if(data2 == null){
                alert("error");
              }
              else{
                this.korisnik = data2;
                localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
                this.loadKorisnik();
                this.unpack();
                this.lozinka = "NONE";
                this.staro_korisnicko_ime = this.korisnik.korisnicko_ime;
                alert(true);
              }
            }
          )
        }
        else{
          alert(false);
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

  unpack(): void{
    this.korisnicko_ime = this.korisnik.korisnicko_ime;
    this.lozinka = "NONE";
    this.bezbednosno_pitanje = this.korisnik.bezbednosno_pitanje;
    this.odgovor = this.korisnik.odgovor;
    this.ime = this.korisnik.ime;
    this.prezime = this.korisnik.prezime;
    this.pol = this.korisnik.pol;
    this.adresa = this.korisnik.adresa;
    this.kontakt_telefon = this.kontakt_telefon;
    this.email = this.korisnik.email;
    this.pol = this.korisnik.pol;
    this.kontakt_telefon = this.korisnik.kontakt_telefon;
    this.email = this.korisnik.email;
    this.profilna_slika = this.korisnik.profilna_slika;
    this.broj_kreditne_kartice = this.korisnik.broj_kreditne_kartice;
  }

  pack(): void{
    this.korisnik.korisnicko_ime = this.korisnicko_ime;
    this.korisnik.lozinka = this.lozinka;
    this.korisnik.bezbednosno_pitanje = this.bezbednosno_pitanje;
    this.korisnik.odgovor = this.odgovor;
    this.korisnik.ime = this.ime;
    this.korisnik.prezime = this.prezime;
    this.korisnik.pol = this.pol;
    this.korisnik.adresa = this.adresa;
    this.korisnik.kontakt_telefon = this.kontakt_telefon;
    this.korisnik.email = this.email;
    this.korisnik.profilna_slika = this.profilna_slika;
    this.korisnik.broj_kreditne_kartice = this.broj_kreditne_kartice;
  }

  lozinkaFlag(){
    this.promenaLozinke = true;
  }

  promeniLozinku():void{
    this.korisnikServis.checkLozinka(this.korisnik.korisnicko_ime,
              this.korisnikServis.hashLozinka(this.stara_lozinka)).subscribe(
      data=>{
        if(data == true){
          if(this.nova_lozinka == this.ponovljena_nova_lozinka){
            if(this.regex(this.nova_lozinka)){
              this.korisnikServis.promeniLozinku(this.korisnik.korisnicko_ime,
                      this.korisnikServis.hashLozinka(this.nova_lozinka)).subscribe(
                data=>{
                  if(data == true){
                    alert("uspeh")
                  }
                }
              )
            }
          }
          else{
            alert("nove lozinke se ne poklapaju")
          }

        }
        else{
          alert("stara lozinka nije dobra")
        }
      }
    )
  }

  bezbednosno(): void{
    this.router.navigate(['promena_lozinke'])
  }
}
