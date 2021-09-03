import { CartService } from "../../services/cart.service";
import { Cart } from "../../model/cart";
export class CartBaseComponent {
    public cartList: Cart[] = [];
    public totalPrice: number;
    constructor(protected cartService: CartService) {
        this.loadCart();
    }
    loadCart = () => {
        this.cartService.cartListSubject
            .subscribe((_cartSub) => {
                this.getCartProducts();
            });
    };

    getCartProducts = () => {
        this.cartService.getCartProducts().subscribe((_cartProducts) => {
            this.cartList = _cartProducts;
            let total = 0;
            for (let cart of this.cartList) {
                total += cart.product.price * cart.quantity;
            }
            this.totalPrice = total;
        });
    }

    removeFromCart = (_product_id: string) => {
        this.cartList = this.cartList.filter(x => x.product_id != _product_id);
        this.cartService.removeCart(_product_id);
    };

    clearCart = () => {
        this.cartList = [];
        this.cartService.cleartCart();
    }
}