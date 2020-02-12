import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HelperService } from '../../services/helper.service';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  file; fileData;
  userDetails: any;
  category: any;
  responseData: any;
  product = { "name": "", "price": "", "category": "", "stock": "", "description": "", "image1": "", "image2": "", "image3": "", "image4": "", "token": "", "user_id": "", "thumb": "" };

  constructor(public helper: HelperService, public navCtrl: NavController, private apiService: ApiService) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.apiService.getData('category').then((result) => {
      this.category = result['category'];
    });
  }

  product_add() {

    this.product.user_id = this.userDetails.user_id;
    this.product.token = this.userDetails.token;

    this.apiService.postData(this.product, 'productAdd').then((result) => {
      this.responseData = result;

      if (this.responseData.product) {
        console.log(this.responseData.product);
        this.navCtrl.navigateRoot('/home');
      } else {
        console.log(this.responseData);
      }
    }, (err) => {
      console.log(err);
    });
  }

  selectedFile: File

  onFileChanged(event, id) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);

    this.apiService.imageData(uploadData).then((result) => {
      this.responseData = result;
      // console.log(this.responseData);

      if (id == "image1") {
        console.log('Image 1: Done');
        this.product.image1 = this.responseData.data.url;
        this.product.thumb = this.responseData.data.thumb.url;
      } else if (id == "image2") {
        this.product.image2 = this.responseData.data.url;
        console.log('Image 2: Done');
      } else if (id == "image3") {
        this.product.image3 = this.responseData.data.url;
        console.log('Image 3: Done');
      } else if (id == "image4") {
        console.log('Image 4: Done');
        this.product.image4 = this.responseData.data.url;
      }

    }, (err) => {
      console.log(err);
    });

  }

}
