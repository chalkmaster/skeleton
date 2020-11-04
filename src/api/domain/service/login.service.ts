import { User } from '../entity/user';
import { NotAuthorizedError } from '../../infrastructure/errors/not-authorized.error';
import { Logger } from '../../infrastructure/logger';
import { jwtHelper } from '../../helpers/jwt.helper';
import { SmsTokenService } from './sms-token.service';
import { UserSession } from '../../infrastructure/user-session';
import { SessionHelper } from '../../helpers/session.helper';
import { CacheHelper } from '../../helpers/cache.helper';
import { TooManyLoginAttemptsError } from '../../infrastructure/errors/too-many-logins-attempts.error';

export class LoginService {
  LOGGIN_ATTEMPTS_DURATION = parseInt(process.env.LOGIN_ATTEMPTS_DURATION || '300');
  MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5');

  constructor(private smsTokenService: SmsTokenService) {
  }

  async tryAuth(email: string, password: string): Promise<User> {
    Logger.security(`auth request for '${email}'`);

    const attemptsKey = `LOGIN_FAIL:${email}`;
    if ((await CacheHelper.getCounter(attemptsKey)) >= this.MAX_LOGIN_ATTEMPTS) {
      throw new TooManyLoginAttemptsError();
    }

    if (email !== 'chalkmaster@gmail.com' || password !== 'master') {
      const attempts = await CacheHelper.incrementCounter(attemptsKey, this.LOGGIN_ATTEMPTS_DURATION);
      if (attempts >= this.MAX_LOGIN_ATTEMPTS) {
        throw new TooManyLoginAttemptsError();
      }
      throw new NotAuthorizedError();
    }

    CacheHelper.clearCounter(attemptsKey);
    
    return new User(
        '1',
        'chalk',
        '31999999999',
        'chalkmaster@gmail.com',
        '1',
        'Sample Test',
        true,
        'minha frase',
    );
  }

  async login(email: string, password: string, deviceId: string, smsToken: string, deviceLocation?: string)
      : Promise<string> {
    const isSmsTokenValid = await this.smsTokenService.validateSMSToken(deviceId, smsToken);

    if (!isSmsTokenValid) {
      Logger.security(`Invalid SMS Token for '${email}' deviceId = ${deviceId}`);
      throw new NotAuthorizedError();
    }

    const user = await this.tryAuth(email, password);
    const userSession = new UserSession(user, deviceId, deviceLocation);
    const token = await jwtHelper.generateJWTToken(userSession);
    
    userSession.authToken = token;
    SessionHelper.setSession(userSession);

    Logger.security(`Login successfuly for '${email}' deviceId = ${deviceId}`);
    return token;
  }

  async send2fa(email: string, password: string, deviceId: string,) {
    const user = await this.tryAuth(email, password);
    return this.smsTokenService.generateSMSToken(user.userPhone, deviceId);
  }

  async logout(sessionId: string) {
    Logger.security(`Logout: SessionId = ${sessionId}`);
    SessionHelper.clearSession(sessionId);
  }
}