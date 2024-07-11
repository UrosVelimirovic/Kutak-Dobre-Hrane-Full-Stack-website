import { SastojakKorpe } from "./sastojakKorpe";

export class Narudzbina{
  korisnicko_ime!: string;
  restoran!: string;
  datum_i_vreme!: string;
  vreme_dostave!: string;
  status!: string; // CEKANJE, POTVRDJENA, ODBIJENA, IZVRSENA
  cena!: number;
  sastojakKorpe!: SastojakKorpe[];
}
