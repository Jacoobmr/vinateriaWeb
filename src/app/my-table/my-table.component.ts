import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MyTableDataSource } from './my-table-datasource';
import { ProductService } from '../services/product.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  products = new BehaviorSubject<any[]>([]);
  dataSource = new ProductDataSource (this.products);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'type', 'size', 'quantity', 'actions' ];

  constructor(
    private productService: ProductService,
    private router: Router
    ) {
    // Load local files
    this.productService.getConfig().subscribe(config => {
      console.log(config);
    });

    this.productService
    .getProducts()
    .subscribe((products: any[]) => {
    this.products.next(products);
    });

    // this.productService.getProducts().subscribe( products => {
    // console.log(products);
    // });
  }
  ngOnInit() {}

  update(product) {
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigate(['/nuevo']);
  }
  delete(product) {
    this.productService.deleteProduct(product.id).subscribe(
      response => {
        console.log('OK ', response);
        // Remove deleted person from the current data collection;
        const tmp = this.products.value.filter(
          p => p.id !== product.id);

          // Update data source Stream
        this.products.next(tmp);
      },
      error => {
        console.log('ERROR: ', error);
      }
    );
  }
}

/** Stream of data that is provided to the table. */
export class ProductDataSource extends DataSource<any> {
  products: BehaviorSubject<any>;

  /** Stream of data that is provided to the table */
  constructor(products: BehaviorSubject<any>) {
    super();
    this.products = products;
  }

  connect(): Observable<any> {
    return this.products;
  }
  disconnect() {}

}
