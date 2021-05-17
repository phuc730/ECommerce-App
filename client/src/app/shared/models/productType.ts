export interface IType {
    id: number;
    name: string;
}

export class TypeFormVa implements IType {
    id: 0;
    name = '';   
    constructor(init?: TypeFormVa) {
      Object.assign(this, init);
    }
}