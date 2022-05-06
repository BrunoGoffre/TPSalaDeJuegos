import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: BehaviorSubject<string> = new BehaviorSubject("");
  email: BehaviorSubject<string> = new BehaviorSubject("");
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afauth: AngularFireAuth) {
    this.IsLogged();
  }

  async Register(usuario: Usuario) {
    try {
      if (usuario != null) {
        //this.db.setUser(usuario);
        this.username.next(usuario.username);
      }
      return await this.afauth.createUserWithEmailAndPassword(usuario.email, usuario.password);
    } catch (error) {
      console.log("Error en register: ", error);
      return null;
    }
  }

  async Login(usuario: Usuario) {
    try {
      //Falta metodo en header para esto
      this.username.next("UserName");
      return await this.afauth.signInWithEmailAndPassword(usuario.email, usuario.password);
    } catch (error) {
      console.log("Error en login", error);
      return null;
    }
  }

  async LoginWithGoogle(email: string, password: string) {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("Error en login With Google", error);
      return null;
    }
  }

  getState() {
    return this.afauth.authState;
  }

  logout() {
    this.afauth.signOut();
    this.username.next("");
    this.isLogged.next(false);

  }

  IsLogged() {
    this.getState().subscribe(res => {
      if (res?.email) {
        this.isLogged.next(true);
      } else {
        this.isLogged.next(false);
      }
    });
  }
}
