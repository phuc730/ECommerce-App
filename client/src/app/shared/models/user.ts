export interface IUser {
    email: string;
    displayName: string;
    token: string;
    role: string;
    passWord: string;
}
export interface IUser1 {
  email: string;
  displayName: string;
  role: string;
  passWord: string;
}

export class UserFormVa implements IUser1 {
    email = '';
    displayName = '';
    role = '';  
    passWord = '';
    constructor(init?: UserFormVa) {
      Object.assign(this, init);
    }
}
