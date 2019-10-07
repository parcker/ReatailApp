export interface AuthToken {
    accessToken: string;
}

export interface IUser {
    readonly email: string;
    readonly tokens: AuthToken[];

    readonly firstName: string;
    readonly lastName: string;
}

export interface ICreateUser {
    email: string;
    firstName: string;
    lastName?: string;
    password:string;
    phonenumber:string;
    username:string;
    emailConfirmed:boolean;
    twoFactorEnable:boolean;
    accessFailedCount:number;
    businessId:string;
  
}
