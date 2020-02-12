import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  // API_URL = "http://localhost/restapi/api/";
  API_URL = "http://52.59.232.143/restapi/api/";

  constructor(private httpClient: HttpClient) { }

  postData(data, type) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.API_URL + type, JSON.stringify(data)).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }

  imageData(uploadData) {
    return new Promise((resolve, reject) => {
      this.httpClient.post("https://api.imgbb.com/1/upload?key=cf7fbbf5f8932ace400cdb799d4c698e", uploadData).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }

  getData(type) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Making request");
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.API_URL + type).subscribe(res => {
        console.log("Received response");
        resolve(res);
        console.log(res);
      }, (err) => {
        reject(err);
      });
    });

  }

}
