import mongoose from 'mongoose'


// Define schema for canvasObject
const canvasObjectSchema = new mongoose.Schema(
  {
    isOriginal: Boolean,
    type: String,
    x: Number,
    y: Number,
    radius: Number,
    width: Number,
    height: Number,
    ordNumber: Number,
    fillStyle: String,
    brojLjudi: Number
    
  },{
    versionKey:false  
  } 
);

// Define schema for canvasPanel containing a list of canvasObjects
const canvasPanelSchema = new mongoose.Schema(
  {
    canvasObjects: [canvasObjectSchema]
  },{
    versionKey:false  
  } 
);
const jeloSchema = new mongoose.Schema(
  {
    naziv: String,
    slika: String,
    cena: Number,
    sastojci: String
  },{
    versionKey:false  
  } 
);
const jelovnikSchema = new mongoose.Schema(
  {
    jela: [jeloSchema]
  },{
    versionKey:false  
  } 
);
const restoranSchema = new mongoose.Schema(
    {
      ime: String,
      tip: String,
      adresa: String,
      telefon: String,
      opis: String,
      konobari: [String],
      ocene: [Number],
      komentari: [String],
      radno_vreme: String,
      canvasPanel: canvasPanelSchema,
      jelovnik: jelovnikSchema
    },{
      versionKey:false  
    }
);
export { jeloSchema };
export default mongoose.model('restoranModel', 
restoranSchema, 'restorani');