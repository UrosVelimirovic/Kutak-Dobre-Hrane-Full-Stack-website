import express from "express";
import korisnikM from '../models/korisnik'
import { savePic, loadPic, deleteFile, renameFile } from '../tools/fileControl';

export class KorisnikController{

    

    login = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime_p = req.body.korisnicko_ime;
        let lozinka_p = req.body.lozinka;
       

        korisnikM.findOne({korisnicko_ime: korisnicko_ime_p, 
        lozinka: lozinka_p}).then((korisnik)=>{
            if(korisnik && korisnik.profilna_slika){
                let ime: string;
                if(korisnik.profilna_slika == "DEFAULT"){
                    ime = "default";
                }
                else{
                    ime = korisnik.korisnicko_ime as string;
                }
                korisnik.profilna_slika = loadPic(ime, "profile_pics");
            }
            res.json(korisnik)
        }).catch((err)=>{
            console.log(err)
        })
        
    }
    getKorisnik = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime_p = req.body.korisnicko_ime;
    
        korisnikM.findOne({korisnicko_ime: korisnicko_ime_p})
        .then((korisnik)=>{
            if(korisnik && korisnik.profilna_slika){
                let ime: string;
                if(korisnik.profilna_slika == "DEFAULT"){
                    ime = "default";
                }
                else{
                    ime = korisnik.korisnicko_ime as string;
                }
                korisnik.profilna_slika = loadPic(ime, "profile_pics");
            }
            res.json(korisnik)
        }).catch((err)=>{
            console.log(err)
            res.json(null);
        })
        
    }
    register = (req: express.Request, res: express.Response)=>{
        korisnikM.find({korisnicko_ime: req.body.korisnicko_ime})
        .then((korisnik)=>{
            if(korisnik.length > 0)
            {
                res.json(false); // check if user with that username already exists
            }
            else{
                let korisnicko_ime = req.body.korisnicko_ime;
                let lozinka = req.body.lozinka;
                let bezbednosno_pitanje = req.body.bezbednosno_pitanje;
                let odgovor = req.body.odgovor;
                let ime = req.body.ime;
                let prezime = req.body.prezime;
                let pol = req.body.pol;
                let adresa = req.body.adresa;
                let kontakt_telefon = req.body.kontakt_telefon;
                let email = req.body.email;
                let profilna_slika = savePic(korisnicko_ime, req.body.profilna_slika, "profile_pics");
                let broj_kreditne_kartice = req.body.broj_kreditne_kartice;
                let tip = req.body.tip;
                let status = req.body.status;
        
                let korisnik = {
                    korisnicko_ime: korisnicko_ime,
                    lozinka: lozinka,
                    bezbednosno_pitanje: bezbednosno_pitanje,
                    odgovor: odgovor,
                    ime: ime,
                    prezime: prezime,
                    pol: pol,
                    adresa: adresa,
                    kontakt_telefon: kontakt_telefon,
                    email: email,
                    profilna_slika: profilna_slika,
                    broj_kreditne_kartice: broj_kreditne_kartice,
                    tip: tip,
                    status: status
                }
        
                new korisnikM(korisnik).save().then(ok=>{
                    res.json(true)
                }).catch(err=>{
                    
                    console.log(err)
                    res.json(false);
                })
            }
        }).catch((err)=>{
            console.log(err)
            res.json(false);
        })
       
    }

    
    deaktiviraj = (req: express.Request, res: express.Response)=>{
        korisnikM.updateOne({korisnicko_ime: req.body.korisnicko_ime},
            {status: "DEAKTIVIRAN"}).then(rezultat=>{
                
            res.json(true);
        }).catch((err)=>{
            console.log(err)
            res.json(false)
        })
    }
   
    azuriraj = (req: express.Request, res: express.Response)=>{
        let slika: string = "";

        if (req.body.picSelected) {
            slika = savePic(req.body.korisnik.korisnicko_ime, req.body.korisnik.profilna_slika, "profile_pics");
        }
       
        const updatedFields: any = {
            korisnicko_ime: req.body.korisnik.korisnicko_ime,
            bezbednosno_pitanje: req.body.korisnik.bezbednosno_pitanje,
            odgovor: req.body.korisnik.odgovor,
            ime: req.body.korisnik.ime,
            prezime: req.body.korisnik.prezime,
            pol: req.body.korisnik.pol,
            adresa: req.body.korisnik.adresa,
            kontakt_telefon: req.body.korisnik.kontakt_telefon,
            email: req.body.korisnik.email,
            broj_kreditne_kartice: req.body.korisnik.broj_kreditne_kartice,
            tip: req.body.korisnik.tip,
            status: req.body.korisnik.status
        };
    
        if (req.body.picSelected) {
            updatedFields.profilna_slika = slika;
        }
        if(req.body.korisnik.lozinka != "NONE"){
            updatedFields.lozinka = req.body.korisnik.lozinka;
        }

    
        korisnikM.updateOne(
            { korisnicko_ime: req.body.staro_korisnicko_ime },
            { $set: updatedFields }
        )
        .then(rezultat => {
            // Check if username changed to delete old profile pics
            if (req.body.staro_korisnicko_ime != req.body.korisnik.korisnicko_ime ) {

                if(req.body.picSelected == true){
                    deleteFile("../backend/src/profile_pics/" + req.body.staro_korisnicko_ime);
                }
                else{
                    const oldPath = `../backend/src/profile_pics/${req.body.staro_korisnicko_ime}`;
                    const newPath = `../backend/src/profile_pics/${req.body.korisnik.korisnicko_ime}`;
                    renameFile(oldPath, newPath);
                }
            }
            res.json(true);
        })
        .catch(err => {
            console.log(err);
            res.json(false);
        });
    
    }

    prihvati = (req: express.Request, res: express.Response)=>{

        korisnikM.updateOne({korisnicko_ime: req.body.korisnicko_ime},
            {status: req.body.status}).then(rezultat=>{
            res.json(true);
        }).catch((err)=>{
            console.log(err)
            res.json(false)
        })
    }

    getBrojRegistrovanihGostiju = (req: express.Request, res: express.Response)=>{
        korisnikM.find(
            {tip: "GOST"}
        ).then(
            brojRegistrovanihGostriju=>{
                res.json(brojRegistrovanihGostriju.length)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }

    getKorisnici = (req: express.Request, res: express.Response)=>{
        korisnikM.find(
            {}
        ).then(
            korisnici=>{
                for(let i = 0; i < korisnici.length; i ++){

                    let imagePath: string;
                    if(korisnici[i].profilna_slika == "DEFAULT"){
                        imagePath = "default";
                    }
                    else{
                        imagePath = korisnici[i].korisnicko_ime as string;
                    }
                    korisnici[i].profilna_slika = loadPic(imagePath, "profile_pics");
                    
                }
               
                res.json
                res.json(korisnici)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }
    getKorisniciStatus = (req: express.Request, res: express.Response)=>{
        korisnikM.find(
            {status: req.body.status}
        ).then(
            korisnici=>{
                for(let i = 0; i < korisnici.length; i ++){
                    if(korisnici[i].profilna_slika){
                        let imagePath: string;
                        if(korisnici[i].profilna_slika == "DEFAULT"){
                            imagePath = "default";
                        }
                        else{
                            imagePath = korisnici[i].korisnicko_ime as string;
                        }
                        korisnici[i].profilna_slika = loadPic(imagePath, "profile_pics");
                    }
                }
               
                res.json
                res.json(korisnici)
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }

    getPitanje = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
       

        korisnikM.findOne({korisnicko_ime: korisnicko_ime,})
                    .then((korisnik)=>{
                        res.json(korisnik?.bezbednosno_pitanje)
                    }).catch((err)=>{
                        console.log(err)
                    })
    }

    potvrdiOdgovor = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let ret = false;
        korisnikM.findOne({korisnicko_ime: korisnicko_ime,})
                    .then((korisnik)=>{
                        if(korisnik?.odgovor == req.body.odgovor){
                            ret = true;
                        }
                        res.json(ret)
                    }).catch((err)=>{
                        console.log(err)
                    })
    }

    promeniLozinku = (req: express.Request, res: express.Response)=>{
        korisnikM.updateOne({korisnicko_ime: req.body.korisnicko_ime},
                            {lozinka: req.body.lozinka})
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

    odsutanPenalty = (req: express.Request, res: express.Response)=>{
        korisnikM.findOne({korisnicko_ime: req.body.korisnicko_ime})
        .then((korisnik)=>{
            let brojOdsustva: number = korisnik?.brojac_nepojavljivanja as number;
            brojOdsustva += 1;
            korisnikM.updateOne({korisnicko_ime: req.body.korisnicko_ime},
                {brojac_nepojavljivanja: brojOdsustva}).then(
                    rez =>{
                        if( (brojOdsustva as number) >= 3){
                            korisnikM.updateOne({korisnicko_ime: req.body.korisnicko_ime},
                                {status: "BLOKIRAN"}).then();
                        }
                    }
                )
            res.json(true)
        }).catch((err)=>{
            res.json(false)
            console.log(err)
        })
    }

    checkLozinka = (req: express.Request, res: express.Response)=>{
        korisnikM.findOne(
            {korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka}
        ).then(
            rez=>{
                res.json(true)
            }
        ).catch(
            (err)=>{
                res.json(false)
                console.log(err)
            }
        )
    }
    
}