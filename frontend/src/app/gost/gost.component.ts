import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { RestoranService } from '../services/restoran.service';
import { Restoran } from '../models/restoran';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit {

  korisnik!: Korisnik;
  profilna_slika_path!: string;
  restorani!: Restoran[];
  regexRestorani: Restoran[] = [];

  regexNaziv: string = "";
  regexAdresa: string = "";
  regexTip: string = "";

  constructor(private router: Router, private restoranServis: RestoranService){}

  ngOnInit(): void {


  }
}
