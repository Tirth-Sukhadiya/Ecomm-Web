import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/products.service";
import { Product } from "../../model/product";
import { CartService } from "../../services/cart.service";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    private sub: Subscription;
    public product: Product;
    quantity: number = 1;
    constructor(private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe(res => {
                this.getProduct(res.id);
            })
    }
    getProduct = (_product_id: string) => {
        this.sub = this.productService.getProductById(_product_id)
            .subscribe((_productDetail) => {
                this.product = _productDetail;
            })
    };
    changeQuantity = (newQuantity: number) => {
        this.quantity = newQuantity;
    };
    addToCart = (product: Product) => {
        if (this.quantity) this.cartService.addToCart({ product, quantity: this.quantity });
    };
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
