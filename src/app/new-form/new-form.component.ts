import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  isNewProduct = true;

  productForm = this.fb.group({
    name: [null, Validators.required],
    type: [null, Validators.required],
    size: [null, Validators.required],
    quantity: [null, Validators.required],
    id: new FormControl()
  });

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private router: Router) {}


ngOnInit(): void {
  const productToUpdate = JSON.parse(
    localStorage.getItem('product')
  );
  console.log(productToUpdate);

  if (productToUpdate !== null) {
    this.isNewProduct = false;
    this.productForm.setValue(productToUpdate);
    localStorage.clear();
  }
}

  onSubmit() {
    console.log(this.productForm.value);
    if (this.isNewProduct) {
      this.productService
      .addProduct(this.productForm.value)
        .subscribe(
          response  => {
          console.log('OK: ', response);
          this.productForm.reset();
      },
      error => {
        console.log('ERROR: ', error);
      }
      );
    } else {
      this.productService
      .updateProduct(this.productForm.value)
      .subscribe(
        response => {
        console.log('OK: ', response);
        this.productForm.reset();
        this.router.navigate(['/lista']);
      },
      error => {
        console.log('ERROR: ', error);
      }
      );
    }
  }
}
