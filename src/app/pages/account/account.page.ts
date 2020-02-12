import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  userDetails: any;
  responseData: any;
  public loggedIn: boolean = false;
  public buyer: boolean = false;
  public seller: boolean = false;

  userPostData = { "user_id": "", "token": "" };

  constructor(public navCtrl: NavController) { }

  ngOnInit() { }

  backToWelcome() {
    console.log('logout!');
    this.navCtrl.navigateRoot('/login');
  }

  logout() {
    localStorage.setItem('userData', '');
    this.loggedIn = false;
    this.buyer = false;
    this.seller = false;
    this.backToWelcome();
  }

  ionViewDidEnter() {
    if (localStorage) {
      if (localStorage['userData']) {
        const data = JSON.parse(localStorage.getItem('userData'));
        if (data) {
          console.log(data);
          this.userDetails = data.userData;
          this.userPostData.user_id = this.userDetails.user_id;
          this.userPostData.token = this.userDetails.token;
          this.loggedIn = true;

          if (this.userDetails.is_buyer == 'Y') {
            this.buyer = true;
            this.seller = false;
          } else {
            this.buyer = false;
            this.seller = true;
          }

        } else {
          this.loggedIn = false;
        }
      } else {
        this.loggedIn = false;
      }
    } else {
      this.loggedIn = false;
    }
  }


}
