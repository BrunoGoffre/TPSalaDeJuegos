import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario("", "", "", "");

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {

  }

  SingIn() {
    if (this.validate(this.usuario)) {
      this.auth.Login(this.usuario).then(res => {
        if (res != null) {
          //this.router.navigateByUrl("/home");
        }
      });
    }
  }

  SingInWithGoogle() {
    this.auth.LoginWithGoogle(this.usuario.email, this.usuario.password).then((res) => {
      if (res == null) {
        console.log("Error", res);
      } else {
        if (res.user?.email)
          this.auth.email.next(res.user.email);
        console.log("Inicio de session exitoso", res);
        this.router.navigateByUrl('home');
      }
    });
  }
  validate(usuario: Usuario) {
    if (usuario.email != "" && usuario.password) {
      return true;
    } else {
      return false;
    }
  }
}

