export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    productType: string;
    productBrand: string;
    quantity: number;
    status: string;
    productTypeId: number;
    productBrandId: number;
    imageId: number;
  }

  export class ProductFormVa implements IProduct {
    id: 0;
    name = '';
    description= '';
    price: 0;
    pictureUrl= ''
    productType= '';
    productBrand= '';
    quantity: 0;
    status= '';
    productTypeId: 0;
    productBrandId: 0;
    imageId: 0;  
    constructor(init?: ProductFormVa) {
      Object.assign(this, init);
    }
}