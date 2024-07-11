import express from "express";
import narudzbinaM from '../models/narudzbina'

export class NarudzbinaController{
    naruci = (req: express.Request, res: express.Response)=>{
        new narudzbinaM(req.body.narudzbina).save().then(ok=>{
            res.json(true)
        }).catch(err=>{
            
             console.log(err)
            res.json(false);
        })
        
    } 

    getMyNarudzbine = (req: express.Request, res: express.Response)=>{
        narudzbinaM.find(
            {korisnicko_ime: req.body.korisnicko_ime}
        ).then(
            narudzbine=>{
                res.json(narudzbine)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
        
    } 
    getNarudzbineFromRestoran = (req: express.Request, res: express.Response)=>{
        narudzbinaM.find(
            {restoran: { $in: req.body.restorani}, status: "CEKANJE"}
        ).then(
            narudzbine=>{
                res.json(narudzbine)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
        
    } 

    potvrdiNarudzbinu = (req: express.Request, res: express.Response)=>{
        narudzbinaM.updateOne(
            {korisnicko_ime: req.body.korisnicko_ime, datum_i_vreme: req.body.datum_i_vreme},
            { $set: { vreme_dostave: req.body.vreme_dostave, status: req.body.status}}
        ).then(
            narudzbine=>{
                res.json(true)
            }
        ).catch(
         
            (err)=>{
                console.log(err);
                res.json(false);
            }

        )
        
    } 

    primljenaNarudzbina = (req: express.Request, res: express.Response)=>{
        narudzbinaM.updateOne(
            {korisnicko_ime: req.body.korisnicko_ime, datum_i_vreme: req.body.datum_i_vreme},
            { status: "IZVRSENA"}
        ).then(
            narudzbine=>{
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