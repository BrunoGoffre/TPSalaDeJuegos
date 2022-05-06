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

  constructor(public aFAuth: AuthService, public router: Router, private aFStore: DatabaseService) {
    this.username = aFAuth.username;
    this.message = new Mensaje("", "", "");
  }

  ngOnInit(): void {
    this.getMessage();
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

      console.log(this.message);
      this.message = this.clearMesaje();
    }
  }

  getMessage() {
    this.aFStore.getMessage().subscribe(data => {
      console.log(data);
      this.messages = data as Array<any>;
    })
  }

  clearMesaje() {
    return new Mensaje("", "", "");
  }
}



