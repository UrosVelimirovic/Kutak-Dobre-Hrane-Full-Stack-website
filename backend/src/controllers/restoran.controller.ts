import express from "express";
import restoranM from '../models/restoran'
import { loadPic, savePic } from "../tools/fileControl";


export class RestoranController{

    getBrojRestorana = (req: express.Request, res: express.Response)=>{
        restoranM.find(
            {}
        ).then(
            brojRestorana=>{
                res.json(brojRestorana.length)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    
   
    getRestorani = (req: express.Request, res: express.Response)=>{
        restoranM.find(
            {}
        ).then(
            restorani=>{
            
                res.json(restorani)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    getCanvasPanel = (req: express.Request, res: express.Response)=>{
        restoranM.findOne(
            {ime: req.body.restoran_ime}
        ).then(
            restoran=>{
                res.json(restoran?.canvasPanel);
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    dodaj = (req: express.Request, res: express.Response)=>{
        let restoran = req.body;
        new restoranM(restoran).save().then(ok=>{
            res.json(true)
        }).catch(err=>{
            console.log(err)
            res.json(false);
        })
    }
    dodajJelo = (req: express.Request, res: express.Response)=>{
        
        restoranM.findOne({ime: req.body.restoran_ime})
            .then(
                (restoran)=>{
                    if(restoran){
                        let slikaIme: string = restoran.ime as String + "_" + req.body.jelo.naziv;
                        let slika: string = savePic(slikaIme, req.body.jelo.slika, "jela_slike");
                        
                        req.body.jelo.slika = slika;

                        let jela: any[] = restoran.jelovnik?.jela || []; 
                        
                        jela.push(req.body.jelo);

                        restoranM.updateOne({ime: restoran.ime}, {$set: { "jelovnik.jela": jela }})
                            .then(
                                rezultat=>{
                                    res.json(true);
                                }
                            )
                            .catch((err)=>{
                            console.log(err)
                            res.json(false)
                        })
                        
                    }
                    else{
                        res.json(false)
                    }
                }
            ) 
   
    }

    getJeloSlika = (req: express.Request, res: express.Response)=>{
        let slikaIme: string = req.body.restoran_ime as String + "_" + req.body.jelo_ime;
     
        res.json(loadPic(slikaIme, "jela_slike"));
    }

    getMyRestorani = (req: express.Request, res: express.Response)=>{
        restoranM.find(
            
        ).then(
            restorani=>{
                let lista: string[] = []
                for(let i = 0; i < restorani.length; i++){
                    for(let j = 0; j < restorani[i].konobari.length;j++){
                        if(restorani[i].konobari[j] == req.body.korisnicko_ime){
                            lista.push(restorani[i].ime as string);
                        }
                    }
                }
                res.json(lista)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }

    sendRestorani = (req: express.Request, res: express.Response)=>{
        
        restoranM.updateOne({ime: req.body.restoran},
                {$push: {konobari: req.body.korisnicko_ime}}
        ).then(
            rez=>{
                res.json(true)
            }
        ).catch(
         
            (err)=>{
                console.log(err);
                res.json(false);
            }

        ) 
    }

    dodajKomentar = (req: express.Request, res: express.Response)=>{
        let komentarNovi: string = req.body.korisnicko_ime + ': ' + req.body.komentar
        restoranM.updateOne({ime: req.body.restoran},
                {$push: {komentari: komentarNovi}}
        ).then(
            rez=>{
                res.json(true)
            }
        ).catch(
         
            (err)=>{
                console.log(err);
                res.json(false);
            }

        ) 
    }
}   
