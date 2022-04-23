import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

  async Register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error en register: ", error);
      return null;
    }
  }

  async RegisterWithUser(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("Error en register: ", error);
      return null;
    }
  }

  async Login(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
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

}
