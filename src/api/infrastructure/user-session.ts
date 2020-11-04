import { v5 as uuidv5 } from 'uuid';
import { User } from '../domain/entity/user';

export class UserSession {
  initializedAt: Date;
  sessionId: string;
  authToken: string = '';

  constructor(public user: User,
              public deviceId: string,
              public deviceLocation?: string){
    this.initializedAt = new Date();
    this.sessionId = uuidv5(process.env.UUID_DNS as string, uuidv5.DNS);
  }
}