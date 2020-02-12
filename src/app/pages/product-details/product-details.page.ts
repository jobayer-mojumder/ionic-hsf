import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  id: string;
  product: any;
  seller: any;

  isLoggedIn = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location, private helper: HelperService, private auth: AuthService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.isLoggedIn = this.auth.isLoggedIn();
    console.log(this.isLoggedIn);
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiService.getData('product-details/' + this.id).then((result) => {
      this.product = result['product'];
      this.suggestion();
    });
  }

  addToCart() {
    if (localStorage) {
      var cart;
      if (!localStorage['cart']) {
        cart = [];
      } else {
        cart = JSON.parse(localStorage['cart']);
      }
      if (!(cart instanceof Array)) {
        cart = []
      }

      let data = cart.find(ob => ob.id === this.product.id);
      if (data == null) {
        if (cart.push(this.product)) {
          localStorage.setItem('cart', JSON.stringify(cart));
          this.helper.showAlert('Product added in the cart!');
        } else {
          this.helper.showAlert('Failed to add Product in cart!');
        }
      } else {
        this.helper.showAlert('Product already in the cart!');
      }
    }
  }



  contact() {
    this.apiService.postData(this.product, 'seller_info').then((result) => {
      this.seller = result['seller'];
      console.log(this.seller);
      var str = "Email: " + this.seller.email + '.     Mobile: ' + this.seller.phone;
      this.helper.showAlert(str);

    });
  }


  suggestion() {
    if (localStorage) {
      var suggest;
      if (!localStorage['suggest']) {
        suggest = [];
      } else {
        suggest = JSON.parse(localStorage['suggest']);
      }
      if (!(suggest instanceof Array)) {
        suggest = []
      }

      let data = suggest.find(ob => ob.id === this.product.id);
      if (data == null) {
        suggest.push(this.product);
      } else {
        console.log("Product exists.");
      }
      localStorage.setItem('suggest', JSON.stringify(suggest));
    }
  }

  backButton() {
    this.location.back();
  }

}
