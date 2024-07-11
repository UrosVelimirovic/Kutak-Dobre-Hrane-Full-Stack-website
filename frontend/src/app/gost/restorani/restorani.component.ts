import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from 'src/app/models/restoran';
import { RestoranService } from 'src/app/services/restoran.service';

@Component({
  selector: 'app-restorani',
  templateUrl: './restorani.component.html',
  styleUrls: ['./restorani.component.css']
})
export class RestoraniComponent implements OnInit {

  restorani!: Restoran[];

  regexRestorani: Restoran[] = [];
  regexNaziv: string = "";
  regexAdresa: string = "";
  regexTip: string = "";


  sortiranje_opcija!: string;

  constructor(private restoranServis: RestoranService,
                private router: Router)
  {}

  ngOnInit(): void {
    this.getRestorani();
  }

  getRestorani(): void{
    this.restoranServis.getRestorani().subscribe(
      data=>{
        this.restorani = data;
      }
    )
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

  prosecnaOcena(restoran: Restoran): number{
    let suma = 0;
    for(let i = 0; i < restoran.ocene.length; i ++){
      suma+= restoran.ocene[i];
    }

    suma /= restoran.ocene.length;
    return suma;
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

  restoranGo(restoranParam: Restoran): void{
    localStorage.setItem('prikazRestorana', JSON.stringify(restoranParam));
    this.router.navigate(['/gost/restoran']);
  }
}
