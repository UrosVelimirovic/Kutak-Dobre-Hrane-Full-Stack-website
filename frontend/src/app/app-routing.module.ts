import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NeregistrovaniKorisnikComponent } from './neregistrovaniKorisnik/neregistrovani-korisnik.component';
import { RegisterComponent } from './register/register.component';
import { GostComponent } from './gost/gost.component';
import { RestoranComponent } from './gost/restoran/restoran.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminStranicaComponent } from './admin/admin-stranica/admin-stranica.component';
import { GenerisiKonobaraComponent } from './admin/generisi-konobara/generisi-konobara.component';
import { RestoranGenerateComponent } from './admin/restoran-generate/restoran-generate.component';
import { ProfilComponent } from './gost/profil/profil.component';
import { RestoraniComponent } from './gost/restorani/restorani.component';
import { DostavaHraneComponent } from './gost/dostava-hrane/dostava-hrane.component';
import { RezervacijeComponent } from './gost/rezervacije/rezervacije.component';
import { PromenaLozinkeComponent } from './login/promena-lozinke/promena-lozinke.component';
import { KonobarComponent } from './konobar/konobar.component';
import { RezervacijeKonobarComponent } from './konobar/rezervacije-konobar/rezervacije-konobar.component';
import { DostaveKonobarComponent } from './konobar/dostave-konobar/dostave-konobar.component';
import { StatistikaComponent } from './konobar/statistika/statistika.component';

const routes: Routes = [
  {path: "", component: NeregistrovaniKorisnikComponent},
  {path: "login", component: LoginComponent},
  {path: "neregistrovaniKorisnik", component: NeregistrovaniKorisnikComponent},
  {path: "register", component: RegisterComponent},
  {
    path: "gost",
    component: GostComponent,
    children: [
      {path: "", component: ProfilComponent},
      {path: "profil", component: ProfilComponent},
      {path: "restorani", component: RestoraniComponent},
      {path: "rezervacije", component: RezervacijeComponent},
      {path: "dostava_hrane", component: DostavaHraneComponent},
      {path: "restoran", component: RestoranComponent}
    ]
  },
  {
    path: "konobar",
    component: KonobarComponent,
    children: [
      {path: "", component: ProfilComponent},
      {path: "profil", component: ProfilComponent},
      {path: "rezervacije", component: RezervacijeKonobarComponent},
      {path: "dostave", component: DostaveKonobarComponent},
      {path: "statistika", component: StatistikaComponent}
    ]
  },
  {path: "admin", component: AdminLoginComponent},
  {path: "adminStranica", component: AdminStranicaComponent},

  {path: "generisiKonobara", component: GenerisiKonobaraComponent},
  {path: "generisiRestoran", component: RestoranGenerateComponent},
  {path: "promena_lozinke", component: PromenaLozinkeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
