import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  userLogged: Observable<string> | null;

  constructor(public aFAuth: AuthService, private router: Router, private aFStore: DatabaseService) {
    this.userLogged = this.aFAuth.username;
  }

  ngOnInit(): void {

  }



  SingOut() {
    this.aFAuth.logout();
    this.router.navigateByUrl("");
  }

  GoTo(page: string) {
    if (this.aFAuth.isLogged.value === true) {
      this.router.navigateByUrl(page);
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}
