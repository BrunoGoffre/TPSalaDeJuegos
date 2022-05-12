import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private readonly URLPreguntas = "https://opentdb.com/api.php?amount=1&category=";

  constructor(private http: HttpClient) { }

  GetPreguntas(categoria: string): Observable<any> {
    return this.http.get(this.URLPreguntas + categoria + "&difficulty=easy&type=multiple");
  }
}
