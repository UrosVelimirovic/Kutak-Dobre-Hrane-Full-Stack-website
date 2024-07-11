import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasObject } from 'src/app/models/canvasObject';
import { CanvasPanel } from 'src/app/models/canvasPanel';
import { Rezervacija } from 'src/app/models/rezervacija';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { NarudzbinaService } from 'src/app/services/narudzbina.service';
import { RestoranService } from 'src/app/services/restoran.service';
import { RezervacijaService } from 'src/app/services/rezervacija.service';

@Component({
  selector: 'app-rezervacije-konobar',
  templateUrl: './rezervacije-konobar.component.html',
  styleUrls: ['./rezervacije-konobar.component.css']
})
export class RezervacijeKonobarComponent implements OnInit{
@ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  rezervacije!: Rezervacija[];
  rezervacijaSelected: Rezervacija | null = null;
  canvasPanel!: CanvasPanel;
  ctx!: CanvasRenderingContext2D;
  objects: CanvasObject[] = [];
  selectedTable: CanvasObject | null = null;
  odbijKomentar: string | null = null;

  potvrdjeneRezervacije: Rezervacija[] = [];
  restorani: string[] = [];

  constructor(private router: Router,
                  private restoranServis: RestoranService,
                    private rezervacijaServis: RezervacijaService,
                      private korisnikServis: KorisnikService){}


  ngOnInit(): void {
    this.getRestorani();
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.draw();
  }

  getRestorani(): void{
    let korisnicko_ime = JSON.parse(localStorage.getItem('ulogovan') as string).korisnicko_ime;
    this.restoranServis.getMyRestorani(korisnicko_ime).subscribe(
      data=>{
        this.restorani = data;
        this.getNeobradjeneRezervacije();
        this.getPotvrdjeneRezervacije();
      }
    )
  }

  getNeobradjeneRezervacije(): void{

    this.rezervacijaServis.getNeobradjeneRezervacije(this.restorani).subscribe(
      data=>{
        data.sort((a,b)=>  new Date(b.datum).getTime() - new Date(a.datum).getTime())
        this.rezervacije = data;

      }
    )
  }

  getPotvrdjeneRezervacije(): void{
    let korisnicko_ime = JSON.parse(localStorage.getItem('ulogovan') as string).korisnicko_ime;
    this.rezervacijaServis.getPotvrdjeneRezervacije(korisnicko_ime, this.restorani).subscribe(
      data=>{
        data.sort((a,b)=>  new Date(b.datum).getTime() - new Date(a.datum).getTime())
        this.potvrdjeneRezervacije = data;
      }
    )
  }

  select(rezervacija: Rezervacija): void{
    this.restoranServis.getCanvasPanel(rezervacija.naziv_restorana).subscribe(
      data=>{
        this.canvasPanel = data;

        this.objects = this.canvasPanel.canvasObjects;
        this.rezervacijaSelected = rezervacija;
        this.obojiObjekte();
      }
    )
  }

  obojiObjekte(){
    for(let i = 0; i < this.objects.length; i ++){
      if(this.objects[i].type == 'table' && this.objects[i] != this.selectedTable){
        this.rezervacijaServis.getBoja((this.rezervacijaSelected as Rezervacija).naziv_restorana,
                                        (this.rezervacijaSelected as Rezervacija).datum,
                                          this.objects[i].ordNumber)
                                .subscribe(
                                            data=>{
                                              if(this.objects[i].ordNumber == (this.rezervacijaSelected as Rezervacija).broj_stola){
                                                this.objects[i].fillStyle = "yellow"
                                              }
                                              else{
                                                this.objects[i].fillStyle = data.text;
                                              }
                                              this.draw();
                                            }
                                          )
      }
    }
  }

  draw(): void{
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

  @HostListener('click', ['$event'])
  onCanvasClick(event: MouseEvent): void {
    const { offsetX: x, offsetY: y } = event;
    if(this.rezervacijaSelected == null || this.rezervacijaSelected.broj_stola != -1){
      return;
    }
   // this.obojiObjekte();
    let clickedObject: CanvasObject | null = null;
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
    this.obojiObjekte();
  }

  private isInsideObject(x: number, y: number, object: CanvasObject): boolean {
    const dx = x - object.x;
    const dy = y - object.y;
    return dx * dx + dy * dy <= object.radius * object.radius;
  }

  potvrdi(bool: boolean): void{

    if(this.rezervacijaSelected == null){

      return;
    }
    if(bool == false && this.odbijKomentar==null){

      return;
    }

    if(this.rezervacijaSelected != null && this.rezervacijaSelected.broj_stola == -1 && this.selectedTable == null){


      return;
    }

    this.rezervacijaSelected.status = ( (bool == true)? "PRIHVACENA": "ODBIJENA" );
    if(this.rezervacijaSelected.broj_stola == -1){
      //alert(this.selectedTable.ordNumber)
      this.rezervacijaSelected.broj_stola = (this.selectedTable as CanvasObject).ordNumber;
    }

    if(bool == false){
      (this.rezervacijaSelected as Rezervacija).komentar = this.odbijKomentar as string;
    }

    this.rezervacijaSelected.konobar = JSON.parse(localStorage.getItem('ulogovan') as string).korisnicko_ime;
    this.rezervacijaServis.potvrdiOdbijRezervaciju(this.rezervacijaSelected).subscribe(
      data=>{
        if(data == true){
          this.rezervacije.splice(this.rezervacije.indexOf(this.rezervacijaSelected as Rezervacija));
          this.getPotvrdjeneRezervacije();
        }
        else{

        }
      }
    )

  }


  prisutna(rezervacija: Rezervacija, bool: boolean): void{
    let minute_dif = (new Date(rezervacija.datum).getTime() - new Date().getTime()) / 1000 / 60;
    if(minute_dif < 30 && minute_dif > 0){
      return;
    }
    rezervacija.status = ((bool == true)? "PRISUTAN": "ODSUTAN");

    this.rezervacijaServis.odsutanPrisutan(rezervacija).subscribe(
      data=>{
        if(data == true && bool == false){
          let korisnicko_ime = rezervacija.ime;
          this.odsutanPenalty(korisnicko_ime);
        }
      }
    )

  }

  odsutanPenalty(korisnicko_ime: string): void{
    this.korisnikServis.odsutanPenalty(korisnicko_ime).subscribe(
      data=>{

      }
    )
  }
  produzi(rezervacija: Rezervacija): void{
    rezervacija.produzena = "DA";
    this.rezervacijaServis.produzi(rezervacija).subscribe(
      data=>{

      }
    )
  }

  oslobodi(rezervacija: Rezervacija): void{
    rezervacija.status = "ISTEKLA";
    this.rezervacijaServis.oslobodi(rezervacija).subscribe(
      data=>{
        if(data == true){
          this.getPotvrdjeneRezervacije();
        }
      }
    )
  }
}
