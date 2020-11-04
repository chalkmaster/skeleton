export class AuditData {
  constructor(public accessedAt: Date,
              public resource: string,
              public userName: string,
              public userEmail: string,
              public userDevice: string,
              public userLocation?: string,
              public query?: {}
            ) {}
}