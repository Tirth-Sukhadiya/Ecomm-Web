import { CreateProductComponent } from "./create-product/create-product.component";
import { ProductComponent } from "./product.component";

export const productRoutes = [
    {
        path: ':id',
        component: ProductComponent
    },
    {
        path: 'create-product/:id',
        component: CreateProductComponent
    },
];