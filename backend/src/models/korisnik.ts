import mongoose from 'mongoose'

const korisnikSchema = new mongoose.Schema(
    {
        korisnicko_ime: String,
        lozinka: String,
        bezbednosno_pitanje: String,
        odgovor: String,
        ime: String,
        prezime: String,
        pol: String,
        adresa: String,
        kontakt_telefon: String,
        email: String,
        profilna_slika: String,
        broj_kreditne_kartice: String,
        tip: String,
        status: String, // ADMIN, PRIHVACEN, DEAKTIVIRAN, BLOKIRAN
        brojac_nepojavljivanja: Number,
    },{
      versionKey:false  
    }
);

export default mongoose.model('korisnikModel', 
korisnikSchema, 'korisnici');