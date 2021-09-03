import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { productRoutes} from "./product.routes";
import {SharedModule} from "../../shared/shared.module";
import {ProductComponent} from "./product.component";
import { CreateProductComponent } from './create-product/create-product.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(productRoutes)
    ],
    declarations: [
        ProductComponent,
        CreateProductComponent
    ]
})
export class ProductModule { }