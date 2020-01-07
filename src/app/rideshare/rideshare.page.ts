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

  async closeModal() {
    await this.modalCtrl.dismiss({
      'dismissed' : true
    });
  }
}
