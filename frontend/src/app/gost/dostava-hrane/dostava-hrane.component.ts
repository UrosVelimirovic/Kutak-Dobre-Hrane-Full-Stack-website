import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { Narudzbina } from 'src/app/models/narudzbina';
import { NarudzbinaService } from 'src/app/services/narudzbina.service';

@Component({
  selector: 'app-dostava-hrane',
  templateUrl: './dostava-hrane.component.html',
  styleUrls: ['./dostava-hrane.component.css']
})
export class DostavaHraneComponent implements OnInit{

  constructor(private router: Router,
    private narudzbinaServis: NarudzbinaService)
    {}

  narudzbine!: Narudzbina[];
  korisnik!: Korisnik;

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan') as string)
    this.getMyNarudzbine();
  }

  getMyNarudzbine():void{
    this.narudzbinaServis.getMyNarudzbine(this.korisnik.korisnicko_ime).subscribe(
      data=>{
        this.narudzbine = data;
      }
    )
  }

  primljena(narudzbina: Narudzbina): void{
    this.narudzbinaServis.primljenaNarudzbina(narudzbina).subscribe(
      data=>{
      }
    )
  }
}
