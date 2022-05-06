import { Injectable } from '@angular/core';
import { collection, addDoc } from "firebase/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { doc, getDoc } from "firebase/firestore";
import { Mensaje } from 'src/app/models/mensaje';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private aFStore: AngularFirestore, private aFAuth: AngularFireAuth, private AFAuthService: AuthService) { }

  setMessege(message: any) {
    return this.aFStore.collection('ChatStorage').add({
      hora: message.hora,
      mensaje: message.message,
      usuario: this.AFAuthService.username.value

    })
  }
  getMessage() {
    return this.aFStore.collection('ChatStorage').valueChanges();
  }

  setUser(usuario: Usuario) {
    return this.aFStore.collection('UsersFromEmail').add({
      FechaRegistro: usuario.FechaCreacion,
      email: usuario.email,
      usuario: this.AFAuthService.username.value
    })
  }

  getUsers() {
    return this.aFStore.collection('UsersFromEmail').valueChanges();
  }
}

