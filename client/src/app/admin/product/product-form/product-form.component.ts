import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ProductFormVa } from 'src/app/shared/models/product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {IType} from 'src/app/shared/models/productType'
import {IBrand} from 'src/app/shared/models/brand';
import {ShopService} from '../../../shop/shop.service'
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() productForm: ProductFormVa;
  // @Input() brands: IBrand[];
  @Input() typesInput: IType[];
  product : ProductFormVa;
  products: IProduct[] ;
  brands: IBrand[];
  types: IType[];
  public url : string = "";
  public typeId : number =parseInt(this.route.snapshot.paramMap.get('id')) ;
  public t:string =this.route.snapshot.url[0].path
  constructor(private route: ActivatedRoute, private productService: ProductService,
    private router: Router, private toastr: ToastrService, private shopService: ShopService) {
      this.url = "";
     }

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
    this.getProducts();
   
  }

  onSubmit(data: ProductFormVa) {
    console.log(data);
    if (this.route.snapshot.url[0].path === 'product-edit') {

      this.productService.updateProduct(this.route.snapshot.paramMap.get('id')!,data).subscribe((response: any) => {
        this.router.navigate(['/admin/product']);
        this.toastr.success('Update Product successful');
        
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
    } else {
      this.productService.createProduct(data).subscribe((response: any) => {
        this.router.navigate(['/admin/product']);
        this.toastr.success('Create Product successful');
        
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
    }
  }

  getBrands() {
    return this.shopService.getBrands().subscribe(res => {
      this.brands = res;
    }, error => {
      console.log(error);
  });;
  }

  getTypes() {
    return this.shopService.getTypes().subscribe(res => {
      this.types = res;
    }, error => {
      console.log(error);
  });;
  }

  getProducts() {
    return this.shopService.getProducts(true).subscribe(res => {
      this.products = res.data;
    }, error => {
      console.log(error);
  });;
  }

  onselectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event:any) => {
      this.url = event.target.result;
      }
    }
    
  }

}
