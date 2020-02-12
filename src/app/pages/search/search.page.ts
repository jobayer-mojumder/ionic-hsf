import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  text: string;
  products;

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.apiService.getData('products').then((result) => {
      //this.products = result['products'];
    });
  }

  search(evt) {
    const searchTerm = evt.srcElement.value;

    if (searchTerm == '') {
      this.apiService.getData('products').then(result => {
        this.products = result['products'];
      });
    } else {
      this.apiService.getData('search/' + searchTerm).then(result => {
        this.products = result['products'];
      });


    }

  }

}
