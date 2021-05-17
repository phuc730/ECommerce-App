export interface IBrand {
    id: number;
    name: string;
}

export class BrandFormVa implements IBrand {
    id: 0;
    name = '';
    
    constructor(init?: BrandFormVa) {
      Object.assign(this, init);
    }
}