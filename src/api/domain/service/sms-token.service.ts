import { Logger } from '../../infrastructure/logger';
import { RedisClient } from 'redis';
import redis from 'redis';

export class SmsTokenService {
  smsTokenExpirationTime: number;
  redisClient: RedisClient;

  constructor() {
    this.smsTokenExpirationTime = parseInt(process.env.SMS_TOKEN_EXPIRATION_SECONDS as string);
    this.redisClient = redis.createClient(process.env.REDIS_URL as string);
  }

  getCacheKey(deviceId: string, smsToken: string): string{
    return `SMS_TOKEN_${deviceId}_${smsToken}`
  }

  async generateSMSToken(userPhone: string, deviceId: string) {
    const smsToken = (Math.random() * 1000000).toFixed().padStart(6,'0');
    const key = this.getCacheKey(deviceId, smsToken);

    await this.redisClient.setex(key, this.smsTokenExpirationTime, smsToken);

    Logger.security(`SMSToken generated successfuly for '${userPhone}' deviceId = ${deviceId}`);
    return { smsToken, userPhone };
  }

  async validateSMSToken(deviceId: string, smsToken: string): Promise<boolean> {
    Logger.security(`Validate SMSToken request on deviceId = ${deviceId}`);
    
    return new Promise((resolve, reject) => {
      const key = this.getCacheKey(deviceId, smsToken);
      this.redisClient.exists(key, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res === 1);
        this.redisClient.del(key);
      });
    });
  }
}