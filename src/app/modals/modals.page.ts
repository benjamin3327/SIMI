import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google; 

@Component({
  selector: 'app-modals',
  templateUrl: './modals.page.html',
  styleUrls: ['./modals.page.scss'],
})
export class ModalsPage implements OnInit {

  key: string= "AIzaSyCD3jLKJ0ewBIZ4FeCaMp7zZQNmlpEvDrE";

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  address:string;
  
  constructor(public modalCtrl: ModalController,
              public geolocation: Geolocation,
              public nativeGeocoder: NativeGeocoder,
              public navParams: NavParams) { }

  ngOnInit() {}
  
  async closeModal() {
    await this.modalCtrl.dismiss({
      'dismissed' : true
    });
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
       console.log('Error getting locations', error);
     });
   }
   
   getAddressFromCoords(lattitude, longitude) {
     console.log("getAddressFromCoords "+lattitude+" "+longitude);
     let options: NativeGeocoderOptions = {
       useLocale: true,
       maxResults: 500
     };
     this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
       .then((result: NativeGeocoderReverseResult[]) => {
         this.address = "";
         this.key = "AIzaSyCD3jLKJ0ewBIZ4FeCaMp7zZQNmlpEvDrE";
         let responseAddress = [];
         for (let [key, value] of Object.entries(result[0])) {
           if(value.length>0)
           responseAddress.push(value);
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
