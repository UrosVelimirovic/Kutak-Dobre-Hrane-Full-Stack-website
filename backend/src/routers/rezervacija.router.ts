import express from "express";
import { RezervacijaController } from "../controllers/rezervacija.controller";




const rezervacijaRouter = express.Router();

rezervacijaRouter.route("/getBrojRezervacijaU24").get(
    (req,res)=>new RezervacijaController().getBrojRezervacijaU24(req,res)
)
rezervacijaRouter.route("/getBrojRezervacijaU7").get(
    (req,res)=>new RezervacijaController().getBrojRezervacijaU7(req,res)
)
rezervacijaRouter.route("/getBrojRezervacijaU1").get(
    (req,res)=>new RezervacijaController().getBrojRezervacijaU1(req,res)
)
rezervacijaRouter.route("/rezervisi").post(
    (req,res)=>new RezervacijaController().rezervisi(req,res)
)
rezervacijaRouter.route("/getBoja").post(
    
    (req,res)=>new RezervacijaController().getBoja(req,res)
)
rezervacijaRouter.route("/getRezervacije").post(   
    (req,res)=>new RezervacijaController().getRezervacije(req,res)
)
rezervacijaRouter.route("/oceniIDodajKomentar").post(   
    (req,res)=>new RezervacijaController().oceniIDodajKomentar(req,res)
)
rezervacijaRouter.route("/otkaziRezervaciju").post(   
    (req,res)=>new RezervacijaController().otkaziRezervaciju(req,res)
)
rezervacijaRouter.route("/getNeobradjeneRezervacije").post(
    (req,res)=>new RezervacijaController().getNeobradjeneRezervacije(req,res)
)
rezervacijaRouter.route("/potvrdiOdbijRezervaciju").post(
    (req,res)=>new RezervacijaController().potvrdiOdbijRezervaciju(req,res)
)
rezervacijaRouter.route("/getPotvrdjeneRezervacije").post(
    (req,res)=>new RezervacijaController().getPotvrdjeneRezervacije(req,res)
)
rezervacijaRouter.route("/odsutanPrisutan").post(
    (req,res)=>new RezervacijaController().odsutanPrisutan(req,res)
)
rezervacijaRouter.route("/produzi").post(
    (req,res)=>new RezervacijaController().produzi(req,res)
)
rezervacijaRouter.route("/oslobodi").post(
    (req,res)=>new RezervacijaController().oslobodi(req,res)
)
rezervacijaRouter.route("/getBrojGostijuPoDanima").post(
    (req,res)=>new RezervacijaController().getBrojGostijuPoDanima(req,res)
)
rezervacijaRouter.route("/getPieInfo").post(
    (req,res)=>new RezervacijaController().getPieInfo(req,res)
)
rezervacijaRouter.route("/getBrojRezervacijaDaniUSedmici").post(
    (req,res)=>new RezervacijaController().getBrojRezervacijaDaniUSedmici(req,res)
)
rezervacijaRouter.route("/getProsecnaOcena").post(
    (req,res)=>new RezervacijaController().getProsecnaOcena(req,res)
)
export default rezervacijaRouter;