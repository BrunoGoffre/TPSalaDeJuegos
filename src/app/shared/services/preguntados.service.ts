import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private readonly URLPreguntas = "https://opentdb.com/api.php?amount=1&category=27&difficulty=easy&type=multiple";

  constructor(private http: HttpClient) { }

  GetPreguntas(): Observable<any> {
    return this.http.get(this.URLPreguntas);
  }
}
