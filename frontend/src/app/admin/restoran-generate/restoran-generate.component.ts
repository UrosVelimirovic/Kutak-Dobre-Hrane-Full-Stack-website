import { Component, HostListener, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CanvasObject } from '../../models/canvasObject';
import { CanvasPanel } from '../../models/canvasPanel';
import { Router } from '@angular/router';
import { Restoran } from '../../models/restoran';
import { RestoranService } from '../../services/restoran.service';
import { Jelovnik } from '../../models/jelovnik';
import { BlobUtils } from '../../tools/blob';

@Component({
  selector: 'app-restoran-generate',
  templateUrl: './restoran-generate.component.html',
  styleUrls: ['./restoran-generate.component.css']
})
export class RestoranGenerateComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  globalOrdNumber: number = 1;
  ctx!: CanvasRenderingContext2D;
  selectedObject: CanvasObject | null = null
  selectedNonOriginalObject:  CanvasObject | null = null
  selectedNonOriginalObjectPeople: number | null = null
  objects: CanvasObject[] = [];
  isDragging = false;

  naziv!: string;
  tip!: string;
  adresa!: string;
  opis!: string;
  kontakt!: string;
  radno_vreme!: string;

  jelovnik: Jelovnik = new Jelovnik;
  trenutni_naziv_jela:string = "";
  trenutna_slika_jela: string = "";
  trenutna_cena_jela!: number;
  trenutni_sastojci_jela: string = "";

  message!: string;

  constructor(private router: Router, private restoranServis: RestoranService){}

  ngOnInit(): void {
    this.jelovnik.jela = [];
  }

  izaberiSliku(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      let slika_path = URL.createObjectURL(selectedFile);

      fetch(slika_path)
        .then(response => response.blob())
        .then(blob => BlobUtils.convertBlobToBase64(blob))
        .then(base64String => {
          this.trenutna_slika_jela = base64String;
        })
        .catch(error => console.error('SLIKA NIJE USPELA DA SE PREVEDE U STRING'));
    }
  }

  dodajJelo(): void {
    let jelo = {
      naziv: this.trenutni_naziv_jela,
      slika: this.trenutna_slika_jela,
      cena: this.trenutna_cena_jela,
      sastojci: this.trenutni_sastojci_jela
    }

    this.jelovnik.jela.push(jelo);
    alert("jelo dodato");
  }

  sacuvajBrojLjudi(): void {
    if (this.selectedNonOriginalObject != undefined) {
      this.selectedNonOriginalObject.brojLjudi = this.selectedNonOriginalObjectPeople as number;
    }
  }

  dodaj(): void {
    let stolovi: number = 0;
    let wc: number = 0;
    let kuhinja: number = 0;

    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].isOriginal == false) {
        if (this.objects[i].type == "table") {
          stolovi++;
        }
        if (this.objects[i].type == "toilet") {
          wc++;
        }
        if (this.objects[i].type == "kitchen") {
          kuhinja++;
        }
      }
    }

    if (stolovi >= 3 && wc >= 1 && kuhinja >= 1) {
      this.message = "";
      let listaObjekata: CanvasObject[] = [];

      for (let i = 0; i < this.objects.length; i++) {
        if (this.objects[i].isOriginal == false) {
          listaObjekata.push(this.objects[i]);
        }
      }
      let canvasPanel: CanvasPanel = {
        canvasObjects: listaObjekata
      }
      let restoran: Restoran = {
        ime: this.naziv,
        tip: this.tip,
        adresa: this.adresa,
        opis: this.opis,
        telefon: this.kontakt,
        radno_vreme: this.radno_vreme,
        konobari: [],
        ocene: [],
        komentari: [],
        canvasPanel: canvasPanel,
        jelovnik: new Jelovnik
      }

      this.restoranServis.dodaj(restoran).subscribe(
        data => {
          if (data == true) {
            this.sendJeloRequests(restoran.ime, this.jelovnik.jela, 0);
          } else {
            alert("Dodavanje nije uspelo");
          }
        }
      )
    } else {
      this.message = "Restoran mora imati bar 3 stola, bar jednu kuhinju i bar jedan wc."
    }
  }

  // rekurzija
  sendJeloRequests(imeRestorana: string, jela: any[], index: number) {
    if (index < jela.length) {
      this.restoranServis.dodajJelo(imeRestorana, jela[index]).subscribe(response => {
        if (response === true) {
          // If request is successful, send next request recursively
          this.sendJeloRequests(imeRestorana, jela, index + 1);
        } else {
          // If request fails, show error message
          console.error("Jelo nije uspesno dodato:", jela[index]);
          alert("Doslo je do greske prilikom dodavanja jelovnika");
        }
      });
    } else {
      // All requests are completed
      alert("Uspesno dodavanje restorana");
    }
  }

  ngAfterViewInit(): void {
      this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    this.initializeObjects();
    this.draw();
  }

  private initializeObjects(): void {
    this.objects.push({ brojLjudi: 0, ordNumber: 0, isOriginal: true, type: 'table', x: 50, y: 50, radius: 20, width: 0, height: 0, fillStyle: 'red' });
    this.objects.push({ brojLjudi: 0, ordNumber: 0, isOriginal: true, type: 'toilet', x: 20, y: 100, radius: 0, width: 60, height: 40, fillStyle: 'blue' });
    this.objects.push({ brojLjudi: 0, ordNumber: 0, isOriginal: true, type: 'kitchen', x: 20, y: 160, radius: 0, width: 60, height: 40, fillStyle: 'green' });

  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const { offsetX: x, offsetY: y } = event;

    for (const object of this.objects) {
      if (this.isInsideObject(x, y, object)) {
        if (object.isOriginal == true) {
          this.selectedObject = { ...object, isOriginal: false };
          if (this.selectedObject.type == 'table') {
            this.selectedObject.ordNumber = -1;
          }

          this.objects.push(this.selectedObject);
        } else {
          this.selectedObject = object;
          if (this.selectedObject.type == 'table') {
            this.selectedNonOriginalObject = this.selectedObject;
            this.selectedNonOriginalObjectPeople = this.selectedNonOriginalObject.brojLjudi;
          }
        }

        this.isDragging = true;
        break;
      }
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging && this.selectedObject) {
      const { offsetX: x, offsetY: y } = event;
      //if (this.isValidPlacement(x, y, this.selectedObject)) {
        this.selectedObject.x = x;
        this.selectedObject.y = y;
        this.draw();
      //}
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.isDragging && this.selectedObject) {
      const { offsetX: x, offsetY: y } = event;
      if (this.isValidPlacement(x, y, this.selectedObject)) {
        if (this.selectedObject.ordNumber == -1) {
          this.selectedObject.ordNumber = this.globalOrdNumber;
          this.globalOrdNumber++;
        }
        this.selectedObject.x = x;
        this.selectedObject.y = y;
      } else {
        // Reset the object position to its last valid position
        const index = this.objects.indexOf(this.selectedObject);
        //console.log(index)
        if (index !== -1) {
          this.selectedObject.x = this.objects[index].x;
          this.selectedObject.y = this.objects[index].y;
        }
      }
      this.isDragging = false;
      this.selectedObject = null;
      this.draw();
    }
  }

  private isInsideObject(x: number, y: number, object: CanvasObject): boolean {
    if (object.radius > 0) {
      const dx = x - object.x;
      const dy = y - object.y;
      return dx * dx + dy * dy <= object.radius * object.radius;
    } else {
      return x >= object.x && x <= object.x + object.width && y >= object.y && y <= object.y + object.height;
    }
  }

  private draw(): void {
    this.ctx.fillStyle = 'white';
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    // Draw the separating line
    this.ctx.beginPath();
    this.ctx.moveTo(100, 0);
    this.ctx.lineTo(100, this.canvas.nativeElement.height);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    for (const object of this.objects) {
      this.ctx.fillStyle = object.fillStyle;
      if (object.radius > 0) {
        this.ctx.beginPath();
        this.ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

        if (object.ordNumber != 0) {
          this.ctx.fillStyle = "white";
          this.ctx.font = "bold 12px Arial";
          this.ctx.textAlign = "center";
          this.ctx.textBaseline = "middle";
          this.ctx.fillText(object.ordNumber.toString(), object.x, object.y);
        }
      } else {
        this.ctx.fillRect(object.x, object.y, object.width, object.height);
      }
    }
  }

  private isValidPlacement(x: number, y: number, selectedObject: CanvasObject): boolean {


     // Check if the object crosses into the original area and delete if it does
    if(this.checkAndDeleteIfOriginalArea(selectedObject)){
      return false;
    }

    for (const object of this.objects) {
      if (object !== selectedObject && this.isOverlapping(selectedObject, object)) {
        return false;
      }
    }
    return true;
  }

  private checkAndDeleteIfOriginalArea(object: CanvasObject): boolean {
    const separationLineX = 100;
    if (!object.isOriginal && object.x < separationLineX) {
      // Object crosses into the original area, delete it
      const index = this.objects.indexOf(object);

      if (index != -1) {

        this.objects.splice(index, 1);
        return true;
      }
    }

    return false
  }

  private isOverlapping(obj1: CanvasObject, obj2: CanvasObject): boolean {
    if (obj1.radius > 0 && obj2.radius > 0) {
      const dx = obj1.x - obj2.x;
      const dy = obj1.y - obj2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < obj1.radius + obj2.radius;
    } else if (obj1.radius > 0) {
      return this.isCircleRectangleOverlapping(obj1, obj2);
    } else if (obj2.radius > 0) {
      return this.isCircleRectangleOverlapping(obj2, obj1);
    } else {
      return !(obj1.x + obj1.width <= obj2.x || obj1.x >= obj2.x + obj2.width || obj1.y + obj1.height <= obj2.y || obj1.y >= obj2.y + obj2.height);
    }
  }

  private isCircleRectangleOverlapping(circle: CanvasObject, rect: CanvasObject): boolean {
    const deltaX = circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const deltaY = circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    return (deltaX * deltaX + deltaY * deltaY) < (circle.radius * circle.radius);
  }

  dodajJSONraspored(event: any):void{
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const json = JSON.parse(e.target.result);

          let tempObjects: CanvasObject[] = json.canvasObjects;

          for(let i = 0; i < tempObjects.length; i ++){
            this.objects.push(tempObjects[i]);
            //console.log(tempObjects[i])
          }

          // for(let i = 0; i < this.objects.length; i ++){
          //   console.log(this.objects[i])

          // }
          this.draw();
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsText(selectedFile);
    }


  }
}
