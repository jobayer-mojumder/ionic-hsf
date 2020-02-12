import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  responseData: any;
  userData = { "email": "", "password": "" };

  constructor(public navCtrl: NavController, public apiService: ApiService, public alertController: AlertController, public helper: HelperService) {
  }

  signin() {
    this.helper.startLoadingAlert();
    this.apiService.postData(this.userData, 'login').then((result) => {
      this.responseData = result;
      if (this.responseData.userData) {
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.navigateRoot('/home');
      }
      else {
        console.log(this.responseData.text);
        this.helper.showAlert(this.responseData.text);
      }
    }, (err) => {
      console.log(err);
    });

  }

  ngOnInit() {
  }

}
