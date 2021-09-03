import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/products.service";
import { Product } from "../../model/product";
import { CartService } from "../../services/cart.service";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    public products: Array<Product>;
    private sub: Subscription;
    constructor(
        private productService: ProductService,
        private cartService: CartService
    ) { }

    ngOnInit() {
        this.load();
    }
    load = () => {
        this.sub = this.productService.getAllProducts()
            .subscribe((_allProducts) => {
                this.products = _allProducts;
            });
    };
    addToCart = (product: Product) => {
        this.cartService.addToCart({ product, quantity: 1 })
    };
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
