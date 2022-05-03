import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  username: Observable<string> | null;
  message: string = "";
  messages: Array<string> = [];

  constructor(public aFAuth: AuthService, private http: HttpClient) {
    this.username = aFAuth.username;
  }

  ngOnInit(): void {
    // Pusher.logToConsole = true;

    // var pusher = new Pusher('fd1e3270913261803b10', {
    //   cluster: 'sa1'
    // });

    // var channel = pusher.subscribe('chat');
    // channel.bind('message', data => {
    //   this.messages.push(data);
    // });
  }

  submit() {
    // this.http.post('http://localhost:4200/api/messages', {
    //   username: this.username,
    //   message: this.message
    // }).subscribe(() => this.message = '');
    this.messages.push(this.message);
    console.log(this.message);
    this.message = "";
  }

}



