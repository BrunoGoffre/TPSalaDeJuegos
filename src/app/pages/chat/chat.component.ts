import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Data, Router } from '@angular/router';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Mensaje } from 'src/app/models/mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  username: Observable<string> | null;
  OldMessageUsername: any;
  message: Mensaje;
  messages: Array<Mensaje> = [];
  horaMensajeViejo: string = "";
  Date: Date = new Date();
  firsTime: boolean = true;

  constructor(public aFAuth: AuthService, public router: Router, private aFStore: DatabaseService) {
    this.username = aFAuth.username;
    this.message = new Mensaje("", "", "");
  }

  ngOnInit(): void {
    this.getMessages();
  }

  submit() {
    if (this.message.mensaje != "" && this.message != undefined) {

      this.message.hora = this.Date.getHours() + ':' + this.Date.getMinutes()
      this.message.usuario = this.aFAuth.username.value;
      this.messages.push(this.message);

      this.aFStore.setMessege({
        hora: this.message.hora,
        message: this.message.mensaje
      })

      this.message = this.clearMesagge();
    }
  }

  getMessages() {
    this.aFStore.getMessage().subscribe(data => {
      if (this.firsTime == true) {
        this.messages = data as Array<Mensaje>;
        this.firsTime = false;
        console.log(data);
      }
    })
  }

  clearMesagge() {
    return new Mensaje("", "", "");
  }
}



