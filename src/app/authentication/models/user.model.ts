export interface User {
    id: number;
    name?: string;
    phone:string;
    email?:string
    password?: string;
    token?: string;
  }
  export abstract class RoleConstants {
    static  SuperAdmin = "0";
    static Admin = "1";
    static NormalUser="2";
  }

  export class FormTexts {
    maptest: { [key: string]: { [key: string]: string } } = {};

  }

  export interface UserCostInfoModel
  {
    id:number,
    userId:number,
    date:string,
    amound?:number,
    item?:string
  }
  