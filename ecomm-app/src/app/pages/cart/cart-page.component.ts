import { Component } from '@angular/core';
import { CartBaseComponent } from "./cart-base.component";
import { CartService } from "../../services/cart.service";
import { Cart } from 'src/app/model/cart';

@Component({
    selector: 'app-cart-page',
    styleUrls: ["cart-page.component.css"],
    templateUrl: 'cart-page.component.html'
})
export class CartPageComponent extends CartBaseComponent {
    constructor(protected cartService: CartService,) {
        super(cartService);
    }

    ngOnInit() {

    }
    changeQuantity = (_cart: Cart, quantity: number) => {
        _cart.quantity = quantity;
        let cartProduct = <Cart>{
            product: <any>_cart.product.id, // pass product_id for API model purpose
            quantity: quantity
        };
        this.cartService.updateCart(cartProduct).subscribe((_cartDetails) => {
            this.cartService.reloadCart(this.cartList);
        })
    }
}