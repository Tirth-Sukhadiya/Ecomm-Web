import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormsModule } from "@angular/forms";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TopbarComponent } from "./components/topbar/topbar.component";
import { CartService } from "./services/cart.service";
import { CartPopupComponent } from "./pages/cart/cart-popup/cart-popup.component";
import { ProductService } from "./services/products.service";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    CartPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CartService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
