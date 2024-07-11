import express from 'express'
import { NarudzbinaController } from '../controllers/narudzbina.controller';


const narudzbinaRouter = express.Router()

narudzbinaRouter.route("/naruci").post(
    (req,res)=>new NarudzbinaController().naruci(req,res)
)
narudzbinaRouter.route("/getMyNarudzbine").post(
    (req,res)=>new NarudzbinaController().getMyNarudzbine(req,res)
)
narudzbinaRouter.route("/getNarudzbineFromRestoran").post(
    (req,res)=>new NarudzbinaController().getNarudzbineFromRestoran(req,res)
)
narudzbinaRouter.route("/potvrdiNarudzbinu").post(
    (req,res)=>new NarudzbinaController().potvrdiNarudzbinu(req,res)
)
narudzbinaRouter.route("/primljenaNarudzbina").post(
    (req,res)=>new NarudzbinaController().primljenaNarudzbina(req,res)
)
export default narudzbinaRouter;