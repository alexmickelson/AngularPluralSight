import { Component, OnInit } from '@angular/core';
import { IProduct } from './Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe(
      p => this.product = p.find(i => i.productId == id)
    );
  }


  onBack(): void {
    this.router.navigate(['/products']);
  }
}
