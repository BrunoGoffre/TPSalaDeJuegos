import { HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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


  constructor(private preguntadoService: PreguntadosService) {
    this.pregunta = new Pregunta("", "", "", "", "", []);
  }

  ngOnInit(): void {
    this.GetPregunta().then(() => { this.esperando = false });
  }

  async GetPregunta() {
    this.preguntadoService.GetPreguntas().subscribe(data => {
      this.pregunta = data['results'][0] as Pregunta;
      this.pregunta.incorrect_answers.splice((Math.random() * 4) + 1, 0, this.pregunta.correct_answer);
    })
  }

  isCorrect(event: any) {
    if (event.target.value as string == this.pregunta.correct_answer) {
      this.Puntaje++;
      this.GetPregunta();
    } else {
      this.perdio = true;
    }
  }
  IntentarOtraVez() {
    this.GetPregunta();
    this.Puntaje = 0;
    this.perdio = false;
  }
}
