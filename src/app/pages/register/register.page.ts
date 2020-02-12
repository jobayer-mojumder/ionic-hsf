import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HelperService } from '../../services/helper.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  responseData: any;
  userData = { "firstname": "", "lastname": "", "email": "", "password": "", "confirm_passowrd": "", "city": "", "state": "", "zip": "", "country": "", "phone": "", "whoami": "" };

  constructor(public helper: HelperService, public apiService: ApiService, public navCtrl: NavController) { }

  ngOnInit() {
  }

  signup() {
    console.log(this.userData);
    if (this.userData.password == this.userData.confirm_passowrd) {
      this.helper.startLoadingAlert();
      this.apiService.postData(this.userData, 'signup').then((result) => {
        this.responseData = result;
        if (this.responseData.userData) {
          console.log(this.responseData);
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

    } else {
      this.helper.showAlert("Confirm Password doesn't match.");
    }
  }

}
