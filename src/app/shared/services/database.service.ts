import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Mensaje } from 'src/app/models/mensaje';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor(private aFStore: AngularFirestore, private aFAuth: AngularFireAuth, private AFAuthService: AuthService) {
  }

  setMessege(message: any) {
    return this.aFStore.collection('ChatStorage').add({
      ID: Date.now(),
      hora: message.hora,
      mensaje: message.message,
      usuario: this.AFAuthService.username.value
    })
  }
  getMessage() {
    return this.aFStore.collection('ChatStorage', ref => ref.orderBy('ID', 'asc')).valueChanges();
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

