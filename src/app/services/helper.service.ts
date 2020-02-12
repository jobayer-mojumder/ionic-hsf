import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  loading: any;
  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  async showAlert(message) {
    const alert = await this.alertCtrl.create({
      subHeader: message,
      buttons: ['Dismiss']
    });
    await alert.present();
  }

  async startLoadingAlert() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
