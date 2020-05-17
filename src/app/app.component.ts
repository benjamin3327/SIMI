import { Component } from '@angular/core';

import { Platform, AlertController, ToastController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

FirstTime: Boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public network: Network,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();

    this.network.onConnect().subscribe(data => {      if (!this.FirstTime) {
          this.displayNetworkUpdate(data.type);
        }
      if (this.alertCtrl) {
          this.alertCtrl.dismiss();
        }
    }, error => console.error(error));
    this.network.onDisconnect().subscribe(async data => {
      this.FirstTime = false;
      const alert = await this.alertCtrl.create({
          cssClass: 'text-center',
          buttons: ['OK'],
          message: 'No active connection detected \n Please check your network connection and try again',
          // enableBackdropDismiss: false
          // showCloseButton: true,
         // duration: 3000,
        });
        alert.present();
      },  error => console.error(error));
  }
  async displayNetworkUpdate(connectionState: string) {
    const toast = await this.toastCtrl.create({
      message: `You are now  ${connectionState}`,
      duration: 3000
    });
    toast.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
