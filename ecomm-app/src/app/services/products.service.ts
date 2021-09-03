import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Product } from "../model/product";

@Injectable()
export class ProductService {

    constructor(public http: HttpClient) { }

    getAllProducts = () => {
        let allProdsUrl = `${environment.apiUrl}/product/`;
        return this.http.get(allProdsUrl)
            .pipe<Product[]>(map((x: any) => x.data));
    }

    getProductById = (_product_id: string) => {
        let productDetail = `${environment.apiUrl}/product/${_product_id}`;
        return this.http.get(productDetail)
            .pipe<Product>(map((x: any) => x.data));
    }

    saveProduct = (file: File, _productDetail: Product): Observable<HttpEvent<any>> => {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('productDetail', JSON.stringify(_productDetail));

        let fileUploadReq = new HttpRequest('POST', `${environment.apiUrl}/product/`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(fileUploadReq);
    }
}