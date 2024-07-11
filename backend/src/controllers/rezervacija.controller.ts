import express from "express";
import rezervacijaM from '../models/rezervacija'
import { DateTimeParser } from '../tools/timeControl';
import { StringNumberPair } from "../models/stringNumberPair";

export class RezervacijaController{
    getBrojRezervacijaU24 = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {}
        ).then(
            brojRezervacijaU24=>{
                res.json(brojRezervacijaU24.length)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    getBrojRezervacijaU7 = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {}
        ).then(
            brojRezervacijaU7=>{
                res.json(brojRezervacijaU7.length)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    getBrojRezervacijaU1 = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {}
        ).then(
            brojRezervacijaU1=>{
                res.json(brojRezervacijaU1.length)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    rezervisi = (req: express.Request, res: express.Response)=>{
        let rezervacija = req.body;
        new rezervacijaM(rezervacija).save().then(ok=>{
            res.json({text: "Vasa rezervacija je uspesno sacuvana"})
        }).catch(err=>{
            console.log(err)
            res.json({text: "Dogodio se problem u bazi"});
        })
    }
    getBoja = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {
                naziv_restorana: req.body.naziv_restorana,
                broj_stola: req.body.sto
            }
        ).then(
            
            rezervacije=>{
                let boja: string = 'white'
                for(let i = 0; i < rezervacije.length; i ++){
                    if(rezervacije[i].status == "CEKANJE"){
                        continue;
                    }
                    if(DateTimeParser.poklapanje(req.body.datum_i_vreme, rezervacije[i].datum as string)){
                        boja = 'red';
                    }
                }

                res.json({text: boja})
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }

    getRezervacije = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {ime: req.body.korisnicko_ime}
        ).then(
            rezervacije=>{
                res.json(rezervacije)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    oceniIDodajKomentar = (req: express.Request, res: express.Response)=>{
    
        rezervacijaM.updateOne({ime: req.body.ime, datum: req.body.datum}, 
                                {$set: { ocena: req.body.ocena, komentar: req.body.komentar }})
            .then(
                rezultat=>{
                    res.json(true);
                }
            )
            .catch((err)=>{
                console.log(err)
                res.json(false)
             }
        )
    }
    otkaziRezervaciju = (req: express.Request, res: express.Response)=>{
        rezervacijaM.updateOne({ime: req.body.ime, datum: req.body.datum}, 
                                {$set: { status: "OTKAZANA" }})
            .then(
                rezultat=>{
                    res.json(true);
                }
            )
            .catch((err)=>{
                console.log(err)
                res.json(false)
             }
        )
    }
    getNeobradjeneRezervacije = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {status: "CEKANJE", naziv_restorana: { $in: req.body.restorani}}
        ).then(
            rezervacije=>{
              res.json(rezervacije)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
        
    } 
    getPotvrdjeneRezervacije = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {konobar: req.body.korisnicko_ime, 
                status: { $in: ["PRIHVACENA", "PRISUTAN"]},
                    naziv_restorana: { $in: req.body.restorani}
                }
        ).then(
            rezervacije=>{
                res.json(rezervacije)
          
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
        
    } 
    potvrdiOdbijRezervaciju = (req: express.Request, res: express.Response)=>{
      
        rezervacijaM.updateOne({ime: req.body.ime, datum: req.body.datum}, 
                                {$set: { status: req.body.status, 
                                                    broj_stola: req.body.broj_stola, 
                                                            komentar: req.body.komentar,
                                                                konobar: req.body.konobar}})
            .then(
                rezultat=>{
                    res.json(true);
                }
            )
            .catch((err)=>{
                console.log(err)
                res.json(false)
             }
        )
    }
    odsutanPrisutan = (req: express.Request, res: express.Response)=>{
      
        rezervacijaM.updateOne({ime: req.body.ime, datum: req.body.datum}, 
                                { status: req.body.status})
            .then(
                rezultat=>{
                    res.json(true);
                }
            )
            .catch((err)=>{
                console.log(err)
                res.json(false)
             }
        )
    }

    produzi = (req: express.Request, res: express.Response)=>{
      
        rezervacijaM.updateOne({ime: req.body.ime, datum: req.body.datum}, 
                                { produzena: req.body.produzena})
            .then(
                rezultat=>{
                    res.json(true);
                }
            )
            .catch((err)=>{
                console.log(err)
                res.json(false)
             }
        )
    }
    
    oslobodi = (req: express.Request, res: express.Response)=>{
        rezervacijaM.updateOne({ime: req.body.ime, datum: req.body.datum}, 
                                { status:"ISTEKLA"})
            .then(
                rezultat=>{
                    res.json(true);
                }
            )
            .catch((err)=>{
                console.log(err)
                res.json(false)
             }
        )
    }
    getBrojGostijuPoDanima = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {konobar: req.body.konobar, status: "ISTEKLA"}
        ).then(
            rezervacije=>{
                let dani: number[] = [0, 0, 0, 0, 0, 0, 0];
               
                for(let i = 0; i < rezervacije.length; i++){
                    let date = new Date(rezervacije[i].datum as string) 
                    let day = date.getDay();
                    dani[day] += rezervacije[i].broj_osoba as number;
                    
                }
             
                res.json(dani);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
        
    } 
    getPieInfo = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {naziv_restorana: req.body.restoran, status: "ISTEKLA"}
        ).then(
            rezervacije=>{
                let mapa: Map<string, number> = new Map<string, number>();

                for(let i = 0; i < rezervacije.length; i ++){
                    if(!mapa.has(rezervacije[i].konobar as string)){
                        mapa.set(rezervacije[i].konobar as string, 0);
                    }
                    mapa.set(rezervacije[i].konobar as string, ( (mapa.get(rezervacije[i].konobar as string)) as number ) + 1 );
                }
                
                let niz: StringNumberPair[] = [];

                mapa.forEach((v,k)=>{
                    let pair = new StringNumberPair();
                    pair.key = k;
                    pair.value = v;
                    niz.push(pair)
                })
                // for(let i = 0; i < niz.length; i ++){
                //     console.log(niz[i].key, niz[i].value)
                // }
                res.json(niz)

            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
        
    } 
    getBrojRezervacijaDaniUSedmici = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {naziv_restorana: req.body.restoran, status: "ISTEKLA"}
        ).then(
            rezervacije=>{
               let niz: number[] = [0,0,0,0,0,0,0]
               let divident: number[] = [0,0,0,0,0,0,0]
               
                
               for(let i = 0; i < rezervacije.length; i ++){ 
                    let time1 = new Date(rezervacije[i].datum as string).getTime();
                    let time2 = new Date().getTime();
                    let timeDif = time2 - time1;
                    let timeDifMonths = timeDif / 1000 / 60 / 60 / 24 / 30;

                    if(timeDifMonths <= 24 &&  timeDifMonths >= 0){
                        niz[new Date(rezervacije[i].datum as string).getDay()] += (rezervacije[i].broj_osoba as number);
                        divident[new Date(rezervacije[i].datum as string).getDay()] += 1;
                    }
               }

               for(let i = 0; i < 7; i ++){
                    niz[i] /= ((divident[i] == 0)? 1: divident[i]);
               }

               res.json(niz);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
        
    } 
    getProsecnaOcena = (req: express.Request, res: express.Response)=>{
        rezervacijaM.find(
            {naziv_restorana: req.body.restoran, status: "ISTEKLA"}
        ).then(
            rezervacije=>{
                let divident = 0;
                let sum = 0;
               for(let i = 0; i < rezervacije.length; i ++){
                sum += rezervacije[i].ocena as number;
                divident += 1;
               }
               sum /= ((divident == 0)? 1: divident);

               res.json(sum);
               
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
        
    } 
    
}