export class Korisnik{
  korisnicko_ime!: string;
  lozinka!: string;
  bezbednosno_pitanje!:string;
  odgovor!: string;
  ime!: string;
  prezime!: string;
  pol!: string;
  adresa!: string;
  kontakt_telefon!: string;
  email!: string;
  profilna_slika!: string;
  broj_kreditne_kartice!: string;
  tip!: string; // GOST KONOBAR ADMIN
  status!: string;  //PRIHVACEN DEAKTIVIRAN ODBIJEN CEKANJE ADMIN
  brojac_nepojavljivanja!: number;
}
