import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Narudzbina } from 'src/app/models/narudzbina';
import { NarudzbinaService } from 'src/app/services/narudzbina.service';
import { RestoranService } from 'src/app/services/restoran.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dostave-konobar',
  templateUrl: './dostave-konobar.component.html',
  styleUrls: ['./dostave-konobar.component.css']
})
export class DostaveKonobarComponent implements OnInit {


  constructor(private router: Router,
                private narudzbinaServis: NarudzbinaService,
                  private restoranServis: RestoranService
  ){}

  narudzbine!: Narudzbina[];
  restorani!: string[];


  barChartLabels: string[] = [];
  reservationsByDate: { [key: string]: number } = {};


  ngOnInit(): void {
    this.getRestorani();
  }

  getMyNarudzbine(): void{
    let korisnicko_ime = JSON.parse(localStorage.getItem('ulogovan') as string).korisnicko_ime;
    this.narudzbinaServis.getNarudzbineFromRestoran(this.restorani).subscribe(
      data=>{
        this.narudzbine = data;
      }
    )
  }

  getRestorani(): void{
    let korisnicko_ime = JSON.parse(localStorage.getItem('ulogovan') as string).korisnicko_ime;
    this.restoranServis.getMyRestorani(korisnicko_ime).subscribe(
      data=>{
        this.restorani = data;
        this.getMyNarudzbine();
      }
    )
  }

  potvrdi(narudzbina: Narudzbina, bool: boolean): void{
    narudzbina.status = ((bool==true)? "POTVRDJENA": "ODBIJENA");
    if(narudzbina.vreme_dostave.length < 1 && bool == true){
      alert("vreme dostave je obavezno");
      return;
    }
    this.narudzbinaServis.potvrdiNarudzbinu(narudzbina).subscribe(
      data=>{
        if(data == true){
         this.getMyNarudzbine();
        }
      }
    )

  }





}

