import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.page.html',
  styleUrls: ['./modals.page.scss'],
})
export class ModalsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  


  ngOnInit() {
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
