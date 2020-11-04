export class User {
  constructor(public userId: string, 
              public userName: string,
              public userPhone: string,
              public userEmail: string,
              public companyId: string,
              public companyName: string, 
              public verificado: boolean,
              public securityPhrase:string,
              ) { }
} 