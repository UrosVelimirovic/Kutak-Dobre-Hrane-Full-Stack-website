import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller';


const korisnikRouter = express.Router()

korisnikRouter.route("/login").post(
    (req,res)=>new KorisnikController().login(req,res)
)
korisnikRouter.route("/register").post(
    (req,res)=>new KorisnikController().register(req,res)
)
korisnikRouter.route("/deaktiviraj").post(
    (req,res)=>new KorisnikController().deaktiviraj(req,res)
)
korisnikRouter.route("/azuriraj").post(
    (req,res)=>new KorisnikController().azuriraj(req,res)
)
korisnikRouter.route("/prihvati").post(
    (req,res)=>new KorisnikController().prihvati(req,res)
)
korisnikRouter.route("/getKorisnici").get(
    (req,res)=>new KorisnikController().getKorisnici(req,res)
)
korisnikRouter.route("/getKorisniciStatus").post(
    (req,res)=>new KorisnikController().getKorisniciStatus(req,res)
)
korisnikRouter.route("/getBrojRegistrovanihGostiju").get(
    (req,res)=>new KorisnikController().getBrojRegistrovanihGostiju(req,res)
)
korisnikRouter.route("/getPitanje").post(
    (req,res)=>new KorisnikController().getPitanje(req,res)
)
korisnikRouter.route("/potvrdiOdgovor").post(
    (req,res)=>new KorisnikController().potvrdiOdgovor(req,res)
)
korisnikRouter.route("/promeniLozinku").post(
    (req,res)=>new KorisnikController().promeniLozinku(req,res)
)
korisnikRouter.route("/getKorisnik").post(
    (req,res)=>new KorisnikController().getKorisnik(req,res)
)
korisnikRouter.route("/odsutanPenalty").post(
    (req,res)=>new KorisnikController().odsutanPenalty(req,res)
)
korisnikRouter.route("/checkLozinka").post(
    (req,res)=>new KorisnikController().checkLozinka(req,res)
)
export default korisnikRouter;