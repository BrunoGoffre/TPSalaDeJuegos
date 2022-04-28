import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario("", "", "");

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  SingIn() {
    console.log(this.usuario);
    this.auth.Login(this.usuario.email, this.usuario.password).then((res) => {
      console.log("Inicio de session exitoso", res);
    });
  }
  SingInWithGoogle() {
    console.log(this.usuario);
    this.auth.LoginWithGoogle(this.usuario.email, this.usuario.password).then((res) => {
      if (res == null) {
        console.log("Error", res);
      } else {
        console.log("Inicio de session exitoso", res);
        this.router.navigateByUrl('home');
      }
    });
  }
}

