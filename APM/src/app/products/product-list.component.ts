import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductSerivce } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle = "Product List";
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    
    constructor(private productService: ProductSerivce) {}

    private _listFilter = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      console.log('In Setter: ', value);
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLowerCase();
      return this.products.filter((product: IProduct) =>
        product.productName.toLowerCase().includes(filterBy));
    }

    ngOnInit(): void {
      this.products = this.productService.getProducts();
      this.filteredProducts = this.products;
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }
}
