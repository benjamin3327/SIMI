import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-rideshare',
  templateUrl: './rideshare.page.html',
  styleUrls: ['./rideshare.page.scss'],
})
export class RidesharePage implements OnInit {

  constructor(public modalCtrl: ModalController,
              public navParams: NavParams) { }

  ngOnInit() {
  }

  book() {
    window.open('https://play.google.com/store/apps/details?id=team.opay.pay', '_system', 'location=yes'); return false;
  }

  async closeModal() {
    await this.modalCtrl.dismiss({
      'dismissed' : true
    });
  }
}
