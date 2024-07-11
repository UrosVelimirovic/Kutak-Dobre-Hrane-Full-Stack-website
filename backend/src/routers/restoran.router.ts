import express from 'express'
import { RestoranController } from '../controllers/restoran.controller'



const restoranRouter = express.Router()

restoranRouter.route("/getBrojRestorana").get(
     (req,res)=>new RestoranController().getBrojRestorana(req,res)
)
restoranRouter.route("/getRestorani").get(
    (req,res)=>new RestoranController().getRestorani(req,res)
)
restoranRouter.route("/dodaj").post(
    (req,res)=>new RestoranController().dodaj(req,res)
)
restoranRouter.route("/dodajJelo").post(
    (req,res)=>new RestoranController().dodajJelo(req,res)
)
restoranRouter.route("/getJeloSlika").post(
    (req,res)=>new RestoranController().getJeloSlika(req,res)
)
restoranRouter.route("/getCanvasPanel").post(
    (req,res)=>new RestoranController().getCanvasPanel(req,res)
)
restoranRouter.route("/getMyRestorani").post(
    (req,res)=>new RestoranController().getMyRestorani(req,res)
)
restoranRouter.route("/sendRestorani").post(
    (req,res)=>new RestoranController().sendRestorani(req,res)
)
restoranRouter.route("/dodajKomentar").post(
    (req,res)=>new RestoranController().dodajKomentar(req,res)
)
export default restoranRouter;