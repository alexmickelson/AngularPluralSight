import { Component, OnInit } from "@angular/core";
import { IProduct } from "./Product";
import { ProductService } from "./product.service";

@Component ({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List!';
    imageWidth: number=50;
    imageMargin: number=2;
    showImage: boolean = false;
    _listFilter: string;
    errorMessage: string;


    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value:string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }
    performFilter(filteredBy: string): IProduct[] {
      filteredBy = filteredBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) => 
          product.productName.toLocaleLowerCase().indexOf(filteredBy) !== -1);
    }

    onRatingClicked(message: string): void{
      this.pageTitle = 'ProductList '+ message;
    }

    ngOnInit(): void {
      this.productService.getProducts().subscribe(
        products => {
           this.products = products;
           this.filteredProducts = this.products;
        },
        e => this.errorMessage = <any>e
      );
      
      this.filteredProducts = this.products;
    }
}