import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  hoy: string = new Date().toLocaleString("en-US", { timeZone: 'America/Argentina/Buenos_Aires' });
  usuario: Usuario = new Usuario("", "", "", this.hoy);

  constructor(public auth: AuthService, private router: Router, private db: DatabaseService) { }

  ngOnInit(): void {
  }

  SingUp() {
    if (this.validate(this.usuario)) {
      try {
        this.auth.Register(this.usuario).then(res => {
          if (res != null) {
            this.auth.username.next(this.usuario.usuario);
            this.db.setUser(this.usuario);
            this.router.navigateByUrl("/home");
          }
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  validate(usuario: Usuario) {
    if (usuario.email != "" && usuario.usuario != "" && usuario.password && usuario.FechaCreacion != "") {
      return true;
    } else {
      return false;
    }
  }

}
