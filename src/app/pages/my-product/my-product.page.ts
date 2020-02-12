import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.page.html',
  styleUrls: ['./my-product.page.scss'],
})
export class MyProductPage implements OnInit {

  products: any;
  user: any;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {

    this.user = this.authService.getAuthUser();
    console.log(this.user);
    this.apiService.getData('my-products/' + this.user.user_id).then((result) => {
      this.products = result['products'];
    });
  }

}
