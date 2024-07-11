import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { RestoranService } from 'src/app/services/restoran.service';
import { RezervacijaService } from 'src/app/services/rezervacija.service';

@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent implements OnInit{


  constructor(private router: Router,
                private rezervacijaServis: RezervacijaService,
                  private restoranServis: RestoranService
  ){}

  ngOnInit(): void {
      this.getBrojGostijuPoDanima();
      this.getAllRestorani();

  }


  //bar chart
  barChartLabels: string[] = [];
  brojGostijuPoDanima: number[] = [];


   //bar chart
   getBrojGostijuPoDanima(): void{
    let korisnicko_ime = JSON.parse(localStorage.getItem("ulogovan") as string).korisnicko_ime;

    this.rezervacijaServis.getBrojGostijuPoDanima(korisnicko_ime).subscribe(
      data=> {
        this.brojGostijuPoDanima = data;

        this.generateBarChart();

      }
    )
  }


  //bar chart
  generateBarChart(): void {
    const ctx = document.getElementById('barChartCanvas') as HTMLCanvasElement;
    if(ctx){
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned"],
          datasets: [{
            label: 'Broj Gostiju Po Danima',
            data: this.brojGostijuPoDanima,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    else {
      console.error('nema kanvasa');
    }
  }

  //pie chart
  sviRestorani!: string[];
  pieInfo: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
  pieInfoKeys: string[] = [];


  //pie chart
  getAllRestorani(): void{
    let korisnicko_ime = JSON.parse(localStorage.getItem("ulogovan") as string).korisnicko_ime;
    this.restoranServis.getMyRestorani(korisnicko_ime).subscribe(
      data=>{
        this.sviRestorani = data;
        this.getPieInfo(0);
      }
    )
  }

  getPieInfo(i: number): void{
    if(i == this.sviRestorani.length){
      this.generatePie();
      return;
    }


    this.rezervacijaServis.getPieInfo(this.sviRestorani[i]).subscribe(
      data=>{
        this.pieInfo.set(this.sviRestorani[i], new Map<string,number>())
        for(let j = 0; j < data.length; j ++){


          (this.pieInfo.get(this.sviRestorani[i]) as Map<string,number>).set(data[j].key, data[j].value)
        }


        this.getPieInfo(i+1);
      }
    )
  }

  generatePie(): void{
    //this.printPieInfo();

    for(let i = 0; i < this.sviRestorani.length; i ++){
      let pieChartId: string = 'pieChartCanvas' + i.toString();

      const canvas = document.getElementById(pieChartId) as HTMLCanvasElement;

      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const restaurant = this.sviRestorani[i];
          const konobars = this.pieInfo.get( this.sviRestorani[i])
          this.generatePieChart(ctx, restaurant, konobars as Map<string,number>);
        } else {
          console.error('Canvas context not found for:', pieChartId);
        }
      } else {
        console.warn('Canvas element not found for:', pieChartId);
      }
    }

    this.getBrojRezervacijaDaniUSedmici(0)
  }

  generatePieChart(ctx: CanvasRenderingContext2D, restaurant: string, konobars: Map<string,number>): void {

    let labels: string[] = [];
    let data: number[] = []
    konobars.forEach((value, key)=>{
      labels.push(key);
      data.push((value == undefined)? 0: value);
    })
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.raw;
                return label;
              }
            }
          }
        }
      }
    });


  }



  // printPieInfo(): void {
  //   console.log('Contents of pieInfo map:');
  //   this.pieInfo.forEach((innerMap, restaurant) => {
  //     console.log(`Restaurant: ${restaurant}`);
  //     this.pieInfo.get(restaurant).forEach((a, b) =>{
  //       console.log(a, b);
  //     })
  //   });
  // }

  //histogram
  brojRezervacijaDaniUSedmici: Map<string, number[]> = new Map<string, number[]>();

  getBrojRezervacijaDaniUSedmici(index: number): void{
    if(index == this.sviRestorani.length){
      this.prepareHisto();
      return;
    }

    this.rezervacijaServis.getBrojRezervacijaDaniUSedmici(this.sviRestorani[index]).subscribe(
      data=>{
        this.brojRezervacijaDaniUSedmici.set(this.sviRestorani[index], data);
        this.getBrojRezervacijaDaniUSedmici(index + 1)
      }
    )
  }

  prepareHisto(): void{
    // this.brojRezervacijaDaniUSedmici.forEach((v,k)=>{
    //   console.log(v, k)
    // })

    for(let i = 0; i < this.sviRestorani.length; i ++){
      let id: string = "barCanvas" + i.toString();
      let canvas = (document.getElementById(id) as HTMLCanvasElement).getContext('2d');
      this.generateHistogram(canvas as CanvasRenderingContext2D ,
        this.sviRestorani[i],  (this.brojRezervacijaDaniUSedmici).get(this.sviRestorani[i] ) as number[]);
    }
  }

  generateHistogram(ctx: CanvasRenderingContext2D, restaurant: string, data: number[]): void {
    new Chart(ctx, {
      type: 'bar', // Change to 'bar' for histogram
      data: {
        labels: ["Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned"], // Example labels for days of the week
        datasets: [{
          label: restaurant,
          data: data,
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Frekvencija' // Y-axis label
            }
          },
          x: {
            title: {
              display: true,
              text: 'Dani u nedelji' // X-axis label
            }
          }
        }
      }
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
