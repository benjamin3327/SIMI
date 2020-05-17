import { IChat } from './../models/chat.model';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';

import { ChatService } from '../services/chat.service';
import { map } from 'rxjs/operators';

import { ModalController, NavController } from '@ionic/angular';

import { TextToSpeech} from '@ionic-native/text-to-speech/ngx';
import { ModalsPage } from '../modals/modals.page';
import { RidesharePage } from '../rideshare/rideshare.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  text_sentences = [];
  chats: IChat[] = [];
  message: string;
  sending: boolean;
  constructor(private _chat: ChatService,
              public modalCtrl: ModalController,
              public navCtrl: NavController,
              private tts: TextToSpeech,
              )
              {}
  ngOnInit() {
     // subscribe to pusher's event
     this._chat.getChannel().bind('chat', data => {
      if (data.type !== 'bot') {
        data.isMe = true;
      }
      this.chats.push(data);
    });
  }
  textToSpeech(text) {
    this.tts.speak(text)
     /* text: "Some text here",
      locale: 'en-GB',
      rate: 0.75
    }) */
     .then(() => console.log('Success'))
     .catch((reason: any) => console.log(reason));
  }

  sendMessage() {
    this.sending = true;
    this._chat.sendMessage(this.message)
    //.pipe(map(res => res.json()))
      .subscribe(_res => {
        this.message = '';
        this.sending = false;
      }, _err => {
        this.sending = false;
    } );
  }
  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ModalsPage,
      componentProps: {
        'name': 'Hello'
      }
    });
      return await modal.present();
  }
  async rideShare() {
    const modal = await this.modalCtrl.create({
      component: RidesharePage,
      componentProps: {
        'name': 'Hello'
      }
    });
      return await modal.present();
  }
}
