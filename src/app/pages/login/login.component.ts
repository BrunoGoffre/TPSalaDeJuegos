import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario("", "", "", "");

  constructor(public auth: AuthService, public router: Router, private aFStore: DatabaseService) { }

  ngOnInit(): void {

  }

  SingIn() {
    if (this.validate(this.usuario)) {
      try {
        this.auth.Login(this.usuario).then(res => {
          this.auth.getState().subscribe(res => {
            if (res?.displayName) {
              this.auth.username.next(res.displayName);
            } else if (res?.email) {
              this.aFStore.getUsers().subscribe(data => {
                data.forEach(item => {
                  if ((item as Usuario).email == res.email) {
                    this.auth.username.next((item as Usuario).usuario);
                  }
                })
              })
            }
            console.log('Sing In Exitoso: ', res);
          })
        });
      }
      catch (error) {
        console.log('Error en logeo', error);
      }
    }
    if (this.auth.username.value != "") {
      this.router.navigateByUrl("/home");
    }

  }

  SingInWithGoogle() {
    this.auth.LoginWithGoogle(this.usuario.email, this.usuario.password).then((res) => {
      if (res == null) {
        console.log("Error", res);
      } else if (res.user?.email && res.user?.displayName) {
        this.auth.email.next(res.user.email);
        this.auth.username.next(res.user.displayName);
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

