import redis from 'redis';
import { UserSession } from '../infrastructure/user-session';
import { Logger } from '../infrastructure/logger';

export class SessionHelper {
  constructor() {
  }

  static setSession(userSession: UserSession) {
    const redisClient = redis.createClient(process.env.REDIS_URL as string);
    const sessionExpirationTime = parseInt(process.env.SESSION_EXPIRATION_SECONDS as string);

    const serializedSession = JSON.stringify(userSession);
    redisClient.setex(userSession.sessionId, sessionExpirationTime, serializedSession);

    Logger.log(`Session Set: sessionId = ${userSession.sessionId}; deviceId = ${userSession.deviceId}`);
  }

  static async getSession(sessionId: string): Promise<UserSession> {
    const redisClient = redis.createClient(process.env.REDIS_URL as string);
    const sessionExpirationTime = parseInt(process.env.SESSION_EXPIRATION_SECONDS as string);

    return new Promise((resolve, reject) => {
      redisClient.get(sessionId, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        const session = JSON.parse(res);
        if (session) {
          redisClient.expire(sessionId, sessionExpirationTime);
          Logger.log(`Session renewed: sessionId = ${sessionId};`);
        }
        resolve(session);
      });
    });
  }

  static async clearSession(sessionId: string) {
    const redisClient = redis.createClient(process.env.REDIS_URL as string);
    redisClient.del(sessionId);

    Logger.log(`Session Clear: sessionId = ${sessionId};`);
  }
}