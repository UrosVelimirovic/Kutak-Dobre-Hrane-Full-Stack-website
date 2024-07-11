import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
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
import { PromenaLozinkeComponent } from './login/promena-lozinke/promena-lozinke.component';
import { CommonModule } from '@angular/common';
import { RezervacijeComponent } from './gost/rezervacije/rezervacije.component';
import { ZvezdiceComponent } from './zvezdice/zvezdice.component';
import { DostavaHraneComponent } from './gost/dostava-hrane/dostava-hrane.component';
import { KonobarComponent } from './konobar/konobar.component';
import { RezervacijeKonobarComponent } from './konobar/rezervacije-konobar/rezervacije-konobar.component';
import { DostaveKonobarComponent } from './konobar/dostave-konobar/dostave-konobar.component';
import { StatistikaComponent } from './konobar/statistika/statistika.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NeregistrovaniKorisnikComponent,
    RegisterComponent,
    GostComponent,
    RestoranComponent,
    RestoraniComponent,
    AdminLoginComponent,
    AdminStranicaComponent,
    GenerisiKonobaraComponent,
    RestoranGenerateComponent,
    ProfilComponent,
    PromenaLozinkeComponent,
    RezervacijeComponent,
    ZvezdiceComponent,
    DostavaHraneComponent,
    KonobarComponent,
    RezervacijeKonobarComponent,
    DostaveKonobarComponent,
    StatistikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
