
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Cart } from "../model/cart";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class CartService {

    constructor(public httpClient: HttpClient) { }

    public cartListSubject = new BehaviorSubject<Cart[]>(<any>[]);
    public toggleCartSubject = new BehaviorSubject(false);

    toggleCart = () => {
        this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
    };

    getCartProducts = () => {
        let cartProdUrl = `${environment.apiUrl}/cart/`;
        return this.httpClient.get(cartProdUrl)
            .pipe<Cart[]>(map((x: any) => x.data));
    }

    addToCart = (_cart: Cart) => {
        let current = this.cartListSubject.getValue();
        let existingCartProd = current.find(c => c.product.id === _cart.product.id);
        // Update Product in Cart
        if (existingCartProd) {
            existingCartProd.quantity += _cart.quantity;
            let cartProduct = <Cart>{
                product: <any>_cart?.product_id ?? _cart?.product.id, // pass product_id for API model purpose
                quantity: existingCartProd.quantity
            };
            this.updateCart(cartProduct).subscribe((_cartResponse) => {
                this.cartListSubject.next(current);
            });
        }
        // Add Product in Cart
        else {
            let cartProduct = <Cart>{
                product: <any>_cart?.product_id ?? _cart?.product.id, // pass product.id for API model purpose
                quantity: _cart.quantity
            };
            this.addProductToCart(cartProduct).subscribe((_cartResponse) => {
                current.push(_cart);
                this.cartListSubject.next(current);
            });
        }
    };
    reloadCart = (cartList: Cart[]) => {
        this.cartListSubject.next(cartList);
    };
    removeCart = (_product_id: string) => {
        this.removeProductFromCart(_product_id).subscribe((_cartResponse) => {
            let current = this.cartListSubject.getValue();
            current = current.filter(x => x.product.id != _product_id);
            this.cartListSubject.next(current);
        });
    };

    cleartCart = () => {
        let clearCartUrl = `${environment.apiUrl}/cart/clear-cart`;
        this.httpClient.delete(clearCartUrl).pipe(map((x: any) => x.data))
            .subscribe((_cartResponse) => {
                this.cartListSubject.next([]);
            });
    }

    addProductToCart = (_cartProduct: Cart) => {
        let addProdCartUrl = `${environment.apiUrl}/cart/`;
        return this.httpClient.post(addProdCartUrl, _cartProduct)
            .pipe(map((x: any) => x.data));
    }

    updateCart = (_cartProduct: Cart) => {
        let addProdCartUrl = `${environment.apiUrl}/cart/${_cartProduct.product}`;
        return this.httpClient.put(addProdCartUrl, _cartProduct)
            .pipe(map((x: any) => x.data));
    }

    removeProductFromCart = (_product_id: string) => {
        let removeProdCartUrl = `${environment.apiUrl}/cart/clear-product/${_product_id}`;
        return this.httpClient.delete(removeProdCartUrl).pipe(map((x: any) => x.data));
    }
}