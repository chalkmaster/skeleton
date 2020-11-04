export class Company {
  constructor(public companyId: number,
              public companyName: string,
              public dominios: string[],
              public AlowedIPs: string[],
              public DeniedIPs: string[],
  ) {}
}