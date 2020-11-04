import redis from 'redis';
import { Logger } from '../infrastructure/logger';

export class CacheHelper {
  constructor() {
  }

  static setCahe(key: string, value: string, duration: number = 60) {
    const redisClient = redis.createClient(process.env.REDIS_URL as string);

    redisClient.setex(key, duration, value);
    Logger.debug(`cache set: key = ${key} duration = ${duration}`);
  }

  static async getCache(key: string): Promise<string> {
    const redisClient = redis.createClient(process.env.REDIS_URL as string);

    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        if (res) {
          redisClient.expire(key, 60);
          Logger.debug(`Cache renewed: key = ${key};`);
        }
        resolve(res);
      });
    });
  }

  static incrementCounter(key: string, duration: number = 60) : Promise<number> {
    const redisClient = redis.createClient(process.env.REDIS_URL as string);
    Logger.debug(`incremented counter: key = ${key}`);

    return new Promise((resolve, reject) => {
      redisClient.incr(key, (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        if (res === 1 && duration) {
          redisClient.expire(key, duration);
          Logger.debug(`Counter expirantion set: key = ${key} duration ${duration}`);
        }

        resolve(res);
      });
    });
  }

  static getCounter(key: string) : Promise<number>{
    const redisClient = redis.createClient(process.env.REDIS_URL as string);
    Logger.debug(`get counter: key = ${key}`);

    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(parseInt(res) || 0);
      });
    });
  }

  static clearCounter(key: string) {
    const redisClient = redis.createClient(process.env.REDIS_URL as string);
    redisClient.del(key);

    Logger.debug(`deleted counter: key = ${key}`);
  }
}