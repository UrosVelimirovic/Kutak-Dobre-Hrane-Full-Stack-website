import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../../services/korisnik.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  korisnicko_ime!: string;
  lozinka!: string;
  message!: string;

  constructor(private router: Router, private servis: KorisnikService){}

  ngOnInit(): void {
    //localStorage.setItem('ulogovan', null);
    //localStorage.setItem('trenutnaRuta', '/login');
  }

  login(): void{
    let korisnik = {
      korisnicko_ime: this.korisnicko_ime,
      lozinka: this.lozinka,
      bezbednosno_pitanje:"",
      odgovor: "",
      ime: "",
      prezime: "",
      pol: "",
      adresa: "",
      kontakt_telefon: "",
      email: "",
      profilna_slika: "",
      broj_kreditne_kartice: "",
      tip: "ADMIN",
      status: "",
      brojac_nepojavljivanja: 0,

    }

    let plainLozinka = korisnik.lozinka;
    korisnik.lozinka = this.servis.hashLozinka(plainLozinka);

    this.servis.login(korisnik).subscribe(
      data=>{
        if(data==null){
          this.message = "pogresno uneti kredencijali";
        }
        else {
          if(data.status != "ADMIN"){
            this.message = "pogresno uneti kredencijali";
            return;
          }
          this.message = "";
          localStorage.setItem("ulogovan", JSON.stringify(data));

          this.router.navigate(['adminStranica']);
        }
      }
    )
  }
}
