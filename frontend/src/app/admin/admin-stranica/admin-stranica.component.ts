import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoranService } from '../../services/restoran.service';
import { Korisnik } from '../../models/korisnik';
import { Restoran } from '../../models/restoran';
import { KorisnikService } from '../../services/korisnik.service';

@Component({
  selector: 'app-admin-stranica',
  templateUrl: './admin-stranica.component.html',
  styleUrls: ['./admin-stranica.component.css']
})
export class AdminStranicaComponent implements OnInit {
  korisnici: Korisnik[] = [];
  korisniciCekanje: Korisnik[] = [];
  restorani: Restoran[] = [];
  slika: string = "";

  constructor(private router: Router,
                private restoranServis: RestoranService,
                  private korisnikServis: KorisnikService
              )
  {}

  ngOnInit(): void {
      //localStorage.setItem('trenutnaRuta', '/gost');
      this.loadKorisnici();
      this.getRestorani();
      this.getKorisniciCekanje();
  }

  loadKorisnici(): void {
    this.korisnikServis.getKorisnici().subscribe(
      data=>{
        this.korisnici = data;
      }
    )
  }

  getRestorani(): void{
    this.restoranServis.getRestorani().subscribe(
      data=>{
        this.restorani = data;
      }
    )
  }

  prikaziSliku(slika: string): void{
    this.slika = 'data:image/png;base64,' + slika;

  }

  azuriraj(korisnik: Korisnik): void{
   // console.log("e");
    localStorage.setItem('azurirajKorisnika', JSON.stringify(korisnik));
    this.router.navigate(['azurirajKorisnika']);
  }

  deaktiviraj(korisnik: Korisnik): void{
    this.korisnikServis.deaktiviraj(korisnik.korisnicko_ime).subscribe(
      data=>{
        if(data==true){
          alert("Korisnik uspesno deaktiviran")
          korisnik.status="DEAKTIVIRAN";

        }
        else{
          alert("Nije uspelo")
        }
      }
    )
  }

  getKorisniciCekanje(): void{
    this.korisnikServis.getKorisniciStatus("CEKANJE").subscribe(
      data=>{
        this.korisniciCekanje = data;
      }
    )
  }

  prihvati(korisnik: Korisnik, status: string): void{
    korisnik.status = status;
    this.korisnikServis.prihvati(korisnik.korisnicko_ime, status).subscribe(
      data=>{
        if(data == true){
          korisnik.status = status;
          this.loadKorisnici();
          this.getKorisniciCekanje();
          alert(true);
        }
        else{
          alert(false);
        }
      }
    )
  }

  registrujKonobara(): void{
    this.router.navigate(['generisiKonobara']);
  }

  generisiRestoran(){
    this.router.navigate(['generisiRestoran']);
  }
}
