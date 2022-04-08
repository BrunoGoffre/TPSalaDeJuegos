import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public ruteo: Router) { }

  GoLogin() {
    this.ruteo.navigateByUrl('login');
  }
  GoHome() {
    this.ruteo.navigateByUrl('home');
  }
  GoError() {
    this.ruteo.navigateByUrl('sdsdsss');
  }
  ngOnInit(): void {
  }

}
