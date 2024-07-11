
export class Rezervacija{
  ime!: string;
  naziv_restorana!: string;
  broj_stola!: number;
  broj_osoba!: number;
  opis!: string;
  datum!: string;
  status!: string; //CEKANJE, PRIHVACENA, ODBIJENA, OTKAZANA, ODSUTAN, PRISUTAN, ISTEKLA
  produzena!: string; // DA, NE
  komentar!: string;
  ocena!: number; // 1 - 5
  konobar!: string;
}
