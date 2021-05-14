import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service'
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  url = "https://localhost:5001/images/products/adidas_football-1.png";
  fileUpload : File = null;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
  }

  onselectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any) => {
        this.url = event.target.result;
        console.log(e);
      }
    }
  }

  onSubmit(){
    this.productService.postFile(this.fileUpload).subscribe(
      data => {
        console.log('done');
      }
    );
  }

}
