import mongoose from 'mongoose'

const sastojakKorpeSchema = new mongoose.Schema(
  {
    jelo: String,
    kolicina: Number
  },{
    versionKey:false  
  } 
);
const narudzbinaSchema = new mongoose.Schema(
    {
        korisnicko_ime: String,
        restoran: String,
        datum_i_vreme: String,
        vreme_dostave: String,
        status: String,
        cena: Number,
        sastojakKorpe: [sastojakKorpeSchema]
    },{
      versionKey:false  
    }
);

export default mongoose.model('narudzbinaModel', 
narudzbinaSchema, 'narudzbine');