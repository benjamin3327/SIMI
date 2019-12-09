import { IChat } from './../models/chat.model';
import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { map } from 'rxjs/operators';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ModalController } from '@ionic/angular';


 
declare var google; 


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  chats: IChat[] = [];
  message: string;
  sending: boolean;
  key: string= "AIzaSyCD3jLKJ0ewBIZ4FeCaMp7zZQNmlpEvDrE";

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address:string;


  constructor(private _chat: ChatService, 
              private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              private modalCtrl: ModalController) {}
  

  ngOnInit() {
    this.loadMap();
     // subscribe to pusher's event
     this._chat.getChannel().bind('chat', data => {
      if (data.type !== 'bot') {
        data.isMe = true;
      }
      this.chats.push(data);
    });
  }

  sendMessage() {
    this.sending = true;
    this._chat.sendMessage(this.message)
    .pipe(map(res => res.json()))
      .subscribe(_res => {
        this.message = '';
        this.sending = false;
      }, _err => {
        this.sending = false;
    } );
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
 
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        this.key = "AIzaSyCD3jLKJ0ewBIZ4FeCaMp7zZQNmlpEvDrE";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value,key);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
        console.log('Error getting Address', error);
    });
  }  
}
