export interface IImage {
    id: number;
    PictureUrl: string;
    Filename: string;
}

export class ImageForm implements IImage {
    id: 0;
    PictureUrl = '';
    Filename = '';   
    constructor(init?: ImageForm) {
      Object.assign(this, init);
    }
}