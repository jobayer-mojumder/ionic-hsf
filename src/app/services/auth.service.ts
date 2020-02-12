import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetails: any;
  userId: any;

  constructor(public http: HttpClient) { }

  getAuthUser() {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    return this.userDetails;
  }

  isLoggedIn() {
    if (localStorage['userData']) {
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userId = data.userData.user_id;
      if (this.userId) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isSeller() {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    if (this.userDetails.is_seller == 'Y' || this.userDetails.is_seller == 'y') {
      return true;
    } else {
      return false;
    }
  }

  isBuyer() {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    if (this.userDetails.is_buyer == 'Y' || this.userDetails.is_buyer == 'y') {
      return true;
    } else {
      return false;
    }
  }

}
