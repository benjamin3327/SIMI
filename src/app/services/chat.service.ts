import { Injectable } from '@angular/core';
import { PusherService } from './pusher.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  ionViewDidLoad() {
    const headers = new Headers();
   }

  private _url = 'https://simi-server.herokuapp.com';

  private _channel: any;

  constructor(public http: HttpClient, private _pusher: PusherService) {
    this._channel = this._pusher.getPusher().subscribe('chat-bot');
  }

  public sendMessage( message: string): Observable<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers });
    
    const param = {
      type: 'human',
      message,
    };
    return this.http.post(`${this._url}/message`, param);
  }

  public getChannel() {
    return this._channel;
  }
}
