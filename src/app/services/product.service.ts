import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private configUrl = 'assets/config.json';
  private apiUrl = 'https://vinateria-api-cjmr.now.sh/api/Products';


  getConfig() {
    return this.http.get(this.configUrl);
  }

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  addProduct(product) {
    return this.http.post(this.apiUrl, product);
  }
  updateProduct(product) {
    return this.http.put(
      this.apiUrl + '/' + product.id,
      product
    );
  }

  deleteProduct(productId) {
    return this.http.delete(this.apiUrl + '/' + productId);
  }
}
