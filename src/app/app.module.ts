import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ErrorComponent } from './pages/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { GamesComponent } from './pages/games/games.component';
import { RegisterComponent } from './pages/register/register.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FormsModule } from "@angular/forms"
import { AngularFireModule } from '@angular/fire/compat';
import { ChatComponent } from './pages/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { AhorcadoComponent } from './components/ahorcado/ahorcado.component';
import { SnakeComponent } from './components/snake/snake.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AboutMeComponent,
    ErrorComponent,
    HeaderComponent,
    CarrouselComponent,
    FooterComponent,
    GamesComponent,
    RegisterComponent,
    ChatComponent,
    PreguntadosComponent,
    AhorcadoComponent,
    SnakeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
