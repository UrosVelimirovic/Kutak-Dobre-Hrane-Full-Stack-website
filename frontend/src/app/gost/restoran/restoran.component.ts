import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Restoran } from '../../models/restoran';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { RestoranService } from '../../services/restoran.service';
import { CanvasObject } from '../../models/canvasObject';
import { RezervacijaService } from '../../services/rezervacija.service';
import { Rezervacija } from '../../models/rezervacija';
import { Korisnik } from '../../models/korisnik';
import { Jelo } from 'src/app/models/jelo';
import { SastojakKorpe } from 'src/app/models/sastojakKorpe';
import { NarudzbinaService } from 'src/app/services/narudzbina.service';
import { Narudzbina } from 'src/app/models/narudzbina';
import { Jelovnik } from 'src/app/models/jelovnik';

@Component({
  selector: 'app-restoran',
  templateUrl: './restoran.component.html',
  styleUrls: ['./restoran.component.css']
})
export class RestoranComponent implements OnInit{
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  korisnik!: Korisnik;

  restoran: Restoran | null = null;
  rezervacija_poruka: string = "";
  rezervacija_broj_osoba: number = 0;
  rezervacija_datum_vreme: string = "NONE";
  rezervacija_opis!: string;

  ctx!: CanvasRenderingContext2D;
  objects: CanvasObject[] = [];
  selectedTable: CanvasObject | null = null;

  naziv!: string;
  tip!: string;
  adresa!: string;
  opis!: string;
  kontakt!: string;
  radno_vreme!: string;

  message!: string;

  korpa: SastojakKorpe[] = [];
  pregledaj_korpu: boolean = false;

  prosecnaOcena!: number;

  constructor(private router: Router,
                private restoranServis: RestoranService,
                  private rezervacijaServis: RezervacijaService,
                    private narudzbinaServis: NarudzbinaService)
  {}

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan') as string)
    this.restoran = JSON.parse(localStorage.getItem('prikazRestorana') as string);
    this.getSlikeJela();
    this.objects = (this.restoran as Restoran).canvasPanel.canvasObjects;
    this.initMap();
    this.getProsecnaOcena();
  }

  getProsecnaOcena(): void{
    this.rezervacijaServis.getProsecnaOcena((this.restoran as Restoran).ime).subscribe(
      data=>{
        this.prosecnaOcena = data
      }
    )
  }
  prikaziKorpu(){
    this.pregledaj_korpu = true;
  }
  parseQuantity(quantityString: string): number {
    return parseInt(quantityString, 10);
  }
  zavrsiNarudzbinu(){
    if(this.korpa.length == 0){
      return;
    }

    let narudzbina: Narudzbina = new Narudzbina();
    narudzbina.korisnicko_ime = this.korisnik.korisnicko_ime;
    narudzbina.restoran = (this.restoran as Restoran).ime;
    narudzbina.datum_i_vreme = (new Date()).toISOString();
    narudzbina.vreme_dostave = "";
    narudzbina.status = "CEKANJE"
    narudzbina.sastojakKorpe = this.korpa;
    let cena: number = 0;

    for(let i = 0; i < this.korpa.length; i ++){

      cena +=   ( (this.restoran as Restoran).jelovnik.jela.find(jelo=>jelo.naziv == this.korpa[i].jelo) as Jelo).cena * this.korpa[i].kolicina;
    }

    narudzbina.cena = cena;

    this.narudzbinaServis.naruci(narudzbina).subscribe(
      data=>{
        if(data == true){
          alert("Narudzbina uspesna");
        }
        else{
          alert("Narudzbina nije uspela")
        }
      }
    )
  }
  dodajUKorpu(jelo: Jelo, kolicina: number): void{
    if (isNaN(kolicina)){
      return;
    }
    this.korpa.push(
      {
        jelo: jelo.naziv,
        kolicina: kolicina
      }
    )
    alert("jelo uspesno dodato u korpu");
  }
  getSlikeJela(): void{
    this.getSlikaRecursive(0);
  }
  getSlikaRecursive(index: number): void{
    if(index == (this.restoran as Restoran).jelovnik.jela.length){
      return;
    }
    this.restoranServis.getJeloSlika
    ((this.restoran as Restoran).ime, (this.restoran as Restoran).jelovnik.jela[index].naziv).subscribe(
      data=>{
        (this.restoran as Restoran).jelovnik.jela[index].slika = 'data:image/png;base64,' + data;
        index++;
        this.getSlikaRecursive(index);
      }
    )

  }

  obojiObjekte(){

    for(let i = 0; i < this.objects.length; i ++){
      if(this.objects[i].type == 'table'){

        this.rezervacijaServis.getBoja((this.restoran as Restoran).ime,
                                        this.rezervacija_datum_vreme,
                                          this.objects[i].ordNumber)
                                .subscribe(
                                            data=>{
                                              this.objects[i].fillStyle = data.text;
                                            }
                                          )
      }
    }
    this.draw();
  }
  potvrdiRezervaciju(): void{
    if(this.rezervacija_broj_osoba <= 0){
      alert("Broj osoba za rezervaciju mora biti veci od 0");
      return;
    }
    if(this.rezervacija_datum_vreme == "NONE"){
      alert("Molim vas izaberite datum i vreme rezervacije");
      return;
    }
    // if(this.selectedTable == null){
    //   alert("Molim vas odaberite sto");
    //   return;
    // }
    if(this.selectedTable != null && this.selectedTable.brojLjudi < this.rezervacija_broj_osoba){
      alert("Ovaj sto nema dovoljno mesta za toliko ljudi");
      return;
    }
    let broj_stola: number;
    if(this.selectedTable != null){
      broj_stola = this.selectedTable.ordNumber;
    }
    else{
      broj_stola = -1;
    }


    let rezervacija: Rezervacija = {
      ime: this.korisnik.korisnicko_ime,
      naziv_restorana: (this.restoran as Restoran).ime,
      broj_stola: broj_stola,
      broj_osoba: this.rezervacija_broj_osoba,
      opis: this.opis,
      datum: this.rezervacija_datum_vreme,
      status: "CEKANJE", //CEKANJE, PRIHVACENA, ODBIJENA, OTKAZANA, ODSUTAN
      produzena: "NE", // DA, NE
      komentar: "",
      ocena: 0,
      konobar: ""
    }
    this.rezervacijaServis.rezervisi(rezervacija).subscribe(
      data=>{
        alert(data.text);
      }
    )
  }
  initMap(): void {
    const key = 'vxwfJMPVbZjSrTlaqlL9';
    const map = L.map('map').setView([49.2125578, 16.62662018], 14); // Starting position
    L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, { // Style URL
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      crossOrigin: true
    }).addTo(map);

    this.getCoordinates((this.restoran as Restoran).adresa).then(coords => {
      // Add a marker to the map at the obtained coordinates
      L.marker(coords).addTo(map)
        .bindPopup((this.restoran as Restoran).adresa)
        .openPopup();
    }).catch(error => {
      console.error('Error fetching coordinates:', error);
    });
  }

  async getCoordinates(address: string): Promise<[number, number]> {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
    const data = await response.json();
    if (data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lat), parseFloat(lon)];
    } else {
        throw new Error('Address not found');
    }
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.draw();
  }

  @HostListener('click', ['$event'])
  onCanvasClick(event: MouseEvent): void {
    const { offsetX: x, offsetY: y } = event;
    this.obojiObjekte();
    let clickedObject: CanvasObject | null= null;
    for (const object of this.objects) {
      if (this.isInsideObject(x, y, object) && object.radius > 0) { // Only consider tables
        clickedObject = object;
        break;
      }
    }

    if (clickedObject) {
      if(clickedObject.fillStyle == 'red'){
        alert("Ovaj sto je zauzet");
        return;
      }
      clickedObject.fillStyle = 'green'; // Set new selected table to green
      this.selectedTable = clickedObject;
    } else {
      if (this.selectedTable) {
        this.selectedTable = null; // Clear the selection
      }
    }
    this.draw();
  }


  private isInsideObject(x: number, y: number, object: CanvasObject): boolean {
    const dx = x - object.x;
    const dy = y - object.y;
    return dx * dx + dy * dy <= object.radius * object.radius;
  }

  private draw(): void {
    if (!this.ctx) { return; }

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Draw the separating line
    this.ctx.beginPath();
    this.ctx.moveTo(100, 0);
    this.ctx.lineTo(100, this.canvas.nativeElement.height);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    // Draw each object
    this.objects.forEach(object => {
      if (object.radius > 0) {
        // Draw circle (table)
        this.ctx.beginPath();
        this.ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2, true);
        this.ctx.fillStyle = object.fillStyle;
        this.ctx.fill();
        this.ctx.stroke();
      } else {
        // Draw rectangle (toilet, kitchen, etc.)
        this.ctx.fillStyle = object.fillStyle;
        this.ctx.fillRect(object.x, object.y, object.width, object.height);
        this.ctx.strokeRect(object.x, object.y, object.width, object.height);
      }

      // Draw brojLjudi text on the object
      this.ctx.fillStyle = 'black'; // Set text color
      this.ctx.font = '14px Arial'; // Set font size and family
      this.ctx.textAlign = 'center'; // Center align text
      this.ctx.textBaseline = 'middle'; // Middle baseline alignment

      if (object.radius > 0) {
        // For circle (table), position text at the center
        this.ctx.fillText(object.brojLjudi.toString(), object.x, object.y);
      }
    });
  }

  ukloniJelo(jelo: string): void{
    for(let i = 0; i < this.korpa.length; i++){
      if(this.korpa[i].jelo == jelo){
        this.korpa.splice(i, 1);
        return;
      }
    }
  }

}
