import { Component } from "@angular/core";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private apiService: ApiService) { }
  newProducts: any;
  topProducts: any;

  ionViewDidEnter() {
    this.apiService.getData('newProducts').then((result) => {
      this.newProducts = result['products'];
    });

    this.apiService.getData('topProducts').then((result) => {
      this.topProducts = result['products'];
    });

  }

}