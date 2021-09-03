import { Product } from "./product";

export class Cart {
    id?: string;
    product_id?: string;
    product: Product;
    quantity: number;
}