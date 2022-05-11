import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  juegoSeleccionado: number = 0;
  empiezaAJugar: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  AbrirJuegoSeleccionado(juego: number) {
    console.log(juego);
    this.juegoSeleccionado = juego;
    this.empiezaAJugar = false;
  }
  EmpiezaAJugar() {
    this.empiezaAJugar = true;
  }



}
