import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
})
export class RecommendationsPage implements OnInit {

  constructor(private apiService: ApiService) { }
  products: any;
  categoryProducts: any;
  visitedProducts: any;
  postdata = { "min": "", "max": "", "average": "", "category": "" };

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (localStorage['suggest']) {

      this.visitedProducts = JSON.parse(localStorage['suggest']);

      console.log(this.sum());
      console.log(this.category());
      console.log("min: " + this.minPrice());
      console.log("max: " + this.maxPrice());
      console.log("average: " + this.averagePrice());

      this.postdata.category = this.maxCategory(this.category());
      this.postdata.min = this.minPrice().toString();
      this.postdata.max = this.maxPrice().toString();
      this.postdata.average = this.averagePrice().toString();

      this.apiService.postData(this.postdata, 'product_price').then((result) => {
        this.products = result['products'];
      }, (err) => {
        console.log(err);
      });

      this.apiService.postData(this.postdata, 'product_category').then((result) => {
        this.categoryProducts = result['products'];
      }, (err) => {
        console.log(err);
      });

    }
  }

  sum() {
    return this.visitedProducts.reduce((a, b) => {
      return parseFloat(a.cost) + parseFloat(b.cost);
    })
  }

  category() {
    var suggest = [];
    this.visitedProducts.forEach(element => {
      //console.log(element.category);
      if (suggest[element.category] === undefined) {
        suggest[element.category] = 1;
      } else {
        suggest[element.category] += 1;
      }

    });
    return suggest;
  }

  maxPrice() {
    var price = 0;
    this.visitedProducts.forEach(element => {
      var x = parseFloat(element.cost);
      if (x >= price) {
        price = x;
      }
    });
    return price;
  }

  minPrice() {
    var price = 100000;
    this.visitedProducts.forEach(element => {
      var x = parseFloat(element.cost);
      if (x <= price) {
        price = x;
      }
    });
    return price;
  }

  averagePrice() {
    var price = 0;
    this.visitedProducts.forEach(element => {
      price += parseFloat(element.cost);
    });
    price = price / Object.keys(this.visitedProducts).length;
    return price;
  }

  maxCategory(products) {
    let max = 0;
    let categoryName = '';

    for (let key in products) {
      let value = products[key];

      if (value > max) {
        max = value;
        categoryName = key;
      }

    }
    return categoryName;
  }

}
