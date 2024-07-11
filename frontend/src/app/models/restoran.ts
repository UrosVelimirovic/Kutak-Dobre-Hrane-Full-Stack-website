import { CanvasPanel } from "./canvasPanel";
import { Jelovnik } from "./jelovnik";
import { Korisnik } from "./korisnik";

export class Restoran{
  ime!: string;
  tip!: string;
  adresa!: string;
  opis!: string;
  telefon!: string;
  konobari!: String[];
  ocene!: number[];
  komentari!: string[];
  radno_vreme!: string;
  canvasPanel!: CanvasPanel;
  jelovnik!: Jelovnik;
}
