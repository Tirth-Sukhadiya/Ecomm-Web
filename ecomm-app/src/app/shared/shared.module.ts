import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuantityControlComponent} from "../components/quantity-control/quantity-control.component";
@NgModule({
    imports:[
        CommonModule,
        FormsModule,
    ],
    declarations:[
        QuantityControlComponent
    ],
    exports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuantityControlComponent
    ]
})

export class SharedModule {

}