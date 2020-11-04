import jwt from 'jsonwebtoken';
import { UserSession } from '../infrastructure/user-session';
import { NotAuthorizedError } from '../infrastructure/errors/not-authorized.error';
import { R } from '../infrastructure/resources';
import { Logger } from '../infrastructure/logger';
import { SessionHelper } from './session.helper';

const CODE_INSIDE_SECRET = 'BREAKING_BAD';

export class jwtHelper {
  static async tryValidateJWTToken(token: string, deviceId:string): Promise<UserSession> {
    const secret = `${process.env.JWT_SECRET}${CODE_INSIDE_SECRET}${deviceId}`;

    Logger.security(`validate JWT Token: deviceId = ${deviceId}`);
    return jwt.verify(token as string, secret) as UserSession
  }

  static async generateJWTToken(userSession: UserSession): Promise<string> {
    const jwtTokenExpirationTime = parseInt(process.env.JWT_TOKEN_EXPIRATION_SECONDS as string);
    const secret = `${process.env.JWT_SECRET}${CODE_INSIDE_SECRET}${userSession.deviceId}`;

    const token = jwt.sign( { 
                              sessionId : userSession.sessionId,
                              userName: userSession.user.userName,
                              companyName: userSession.user.companyName,
                            },
                            secret,
                            { expiresIn: jwtTokenExpirationTime }
      );

    Logger.security(`Generate JWT Token: Session = ${userSession.sessionId} deviceId = ${userSession.deviceId}`);
    return token;
  }

  static async refreshJWTToken(oldToken: string, deviceId: string): Promise<string> {
    const secret = `${process.env.JWT_SECRET}${CODE_INSIDE_SECRET}${deviceId}`;
    const userData = jwt.verify(oldToken, secret, { ignoreExpiration : true }) as UserSession;
    const userSession = await SessionHelper.getSession(userData.sessionId);

    if (!userSession || userSession.authToken !== oldToken) {
      throw new NotAuthorizedError(R.ERROR_MESSAGE.JWT_TOKEN_RENEW_ERROR);
    }

    const token = await this.generateJWTToken(userSession);
    
    userSession.authToken = token;
    
    SessionHelper.setSession(userSession);
    Logger.security(`Refresh JWT Token: sessionId = ${userSession.sessionId} deviceId = ${userSession.deviceId}`);
    return token;
  }
}