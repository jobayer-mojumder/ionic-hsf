import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  products: any;
  buyer: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (localStorage['cart']) {
      this.products = JSON.parse(localStorage['cart']);
    }
  }

  clearCart() {
    localStorage.setItem('cart', '');
    localStorage.setItem('suggest', '');
    this.products = [];
  }

}
