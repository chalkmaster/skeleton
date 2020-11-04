import { Request, NextFunction, Response } from 'express';
import { Logger } from '../../infrastructure/logger';
import { R } from '../../infrastructure/resources';
import { CacheHelper } from '../../helpers/cache.helper';

export async function QuotaGuard(req: Request, res: Response, next: NextFunction) {
  const token = req.headers[R.REQUEST_HEADERS.ACCESS_TOKEN] as string;
  const deviceId = req.headers[R.REQUEST_HEADERS.DEVICE_ID] as string;
  const quotaDuration = parseInt(process.env.QUOTA_DURATION || '100');
  const maxQuota = parseInt(process.env.MAX_QUOTA || '100');

  if (!token) return res.status(401).send(R.ERROR_MESSAGE.NO_TOKEN_PROVIDED);
  if (!deviceId) return res.status(401).send(R.ERROR_MESSAGE.NO_DEVICEID_PROVIDED);
  
  try {
    const quotaKey = `QUOTA_USAGE:${req.baseUrl}:${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`;
    let quotaUsage = await CacheHelper.getCounter(quotaKey);
    Logger.debug('quota key ' + quotaKey + ' usage: ' + quotaUsage);
    res.header(R.RESPONSE_HEADERS.RATE_LIMIT, maxQuota.toString());
    res.header(R.RESPONSE_HEADERS.RATE_LIMIT_REMAINING, (maxQuota - quotaUsage).toString());
    res.header(R.RESPONSE_HEADERS.RATE_LIMIT_TIME, quotaDuration.toString());

    if (quotaUsage > maxQuota) {
      return res.status(429).send(R.ERROR_MESSAGE.QUOTA_EXCEEDED);
    }
    
    quotaUsage = await CacheHelper.incrementCounter(quotaKey, quotaDuration);

    next();
  } catch (err) {
    return res.status(500).send(err.ERROR_MESSAGE);
  }

  return;
};