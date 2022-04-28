import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  usuario: Usuario = new Usuario("", "", "");

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  SingUp() {
    console.log(this.usuario);
    this.auth.Register(this.usuario.email, this.usuario.password).then((res) => {
      if (res == null) {
        console.log(res);
      }
      else {
        console.log("Se Registro", res);
      }
    });
  }


}
