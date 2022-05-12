import { HttpHandler } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Pregunta } from 'src/app/models/pregunta';
import { PreguntadosService } from 'src/app/shared/services/preguntados.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  pregunta: Pregunta;
  numero: any = 2;
  esperando: boolean = true;
  Puntaje: number = 0;
  perdio: boolean = false;
  categoria: string | null = null;
  //@Output() Puntaje;

  constructor(private preguntadoService: PreguntadosService) {
    this.pregunta = new Pregunta("", "", "", "", "", []);
    this.categoria = null;
  }

  ngOnInit(): void {
  }

  async GetPregunta(categoria: string) {
    this.preguntadoService.GetPreguntas(categoria as string).subscribe(data => {
      this.pregunta = data['results'][0] as Pregunta;
      this.pregunta.incorrect_answers.splice((Math.random() * 4) + 1, 0, this.pregunta.correct_answer);
    })
  }

  isCorrect(event: any) {
    if (event.target.value as string == this.pregunta.correct_answer) {
      this.Puntaje++;
      this.GetPregunta(this.categoria as string);
    } else {
      this.perdio = true;
    }
  }

  IntentarOtraVez() {
    this.GetPregunta(this.categoria as string);
    this.Puntaje = 0;
    this.perdio = false;
  }

  getCategoria(event: any) {
    this.categoria = event.target.value as string;
    this.GetPregunta(this.categoria).then(() => { this.esperando = false });
  }

  ElejirOtraCategoria() {
    this.pregunta = new Pregunta("", "", "", "", "", []);
    this.perdio = false;
    this.categoria = null;
    this.Puntaje = 0;
  }
}
