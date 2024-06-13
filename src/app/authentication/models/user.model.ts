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
    static SuperUser = "1";
  }

  export class FormTexts {
    maptest: { [key: string]: { [key: string]: string } } = {};

  }
  