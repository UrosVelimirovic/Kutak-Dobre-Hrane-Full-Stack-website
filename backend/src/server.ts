import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import korisnikRouter from './routers/korisnik.router';
import restoranRouter from './routers/restoran.router';
import rezervacijaRouter from './routers/rezervacija.router';
import narudzbinaRouter from './routers/narudzbina.router';

const app = express();

app.use(cors())
app.use(express.json())

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/baza')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()
router.use('/korisnici', korisnikRouter)
router.use('/restoran', restoranRouter)
router.use('/rezervacija', rezervacijaRouter)
router.use('/narudzbina', narudzbinaRouter)

app.use("/" ,router)
app.listen(4000, () => console.log(`Express server running on port 4000`));