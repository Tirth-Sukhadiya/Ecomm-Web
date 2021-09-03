import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup;
  message = '';
  selectedFiles?: FileList;

  constructor(private fb: FormBuilder,
    private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      image_path: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      unit: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  handleUpload = (_event: any) => {
    this.selectedFiles = _event.target.files;
  }

  onSubmit = () => {
    if (this.productForm.valid) {
      if (this.selectedFiles) {
        let currentFile: File | null = this.selectedFiles.item(0);

        if (currentFile) {
          let formData = this.productForm.value;
          formData.image_path = `${window.location.origin}/assets/imgs`;
          this.productService.saveProduct(currentFile, this.productForm.value).subscribe(
            (event: any) => {
              if (event instanceof HttpResponse) {
                this.message = event.body.message;
              }
            }, (err: any) => {
              console.log(err);
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the file!';
              }
              currentFile = undefined;
            });
        }
      }
    }
  }

}
