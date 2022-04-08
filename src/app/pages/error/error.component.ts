import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(public ruteo: Router) {
  }

  goBackHome() {
    this.ruteo.navigateByUrl('home');
  }

  ngOnInit(): void {
  }

}
