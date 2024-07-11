import mongoose from 'mongoose'


const rezervacijaSchema = new mongoose.Schema(
    {
      ime: String,
      naziv_restorana: String,
      broj_stola: Number,
      broj_osoba: Number,
      opis: String,
      datum: String,
      status: String, //CEKANJE, PRIHVACENA, ODBIJENA, OTKAZANA, ODSUTAN, ISTEKLA
      produzena: String, // DA, NE
      ocena: Number,
      komentar: String,
      konobar: String
    },{
      versionKey:false  
    }
);

export default mongoose.model('rezervacijaModel', 
rezervacijaSchema, 'rezervacije');
