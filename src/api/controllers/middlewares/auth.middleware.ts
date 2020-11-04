import { Request, NextFunction, Response } from 'express';
import { jwtHelper } from '../../helpers/jwt.helper';
import { Logger } from '../../infrastructure/logger';
import { R } from '../../infrastructure/resources';
import { Auditter } from '../../infrastructure/auditter';

export async function AuthChecker(req: Request, res: Response, next: NextFunction) {
  const token = req.headers[R.REQUEST_HEADERS.ACCESS_TOKEN] as string;
  const deviceId = req.headers[R.REQUEST_HEADERS.DEVICE_ID] as string;

  if (!token) return res.status(401).send(R.ERROR_MESSAGE.NO_TOKEN_PROVIDED);
  if (!deviceId) return res.status(401).send(R.ERROR_MESSAGE.NO_DEVICEID_PROVIDED);
  
  try {
    const userSession = await jwtHelper.tryValidateJWTToken(token, deviceId);
    req.params.sessionId = userSession.sessionId;
    Auditter.register(userSession.sessionId, req.baseUrl + req.path, req.query);
    next();
  } catch (err) {
    Logger.error(err);
    if (err.name === R.ERROR_TYPE.TOKEN_EXPIRED_ERROR) return res.status(401).send(R.ERROR_MESSAGE.JWT_TOKEN_EXPIRED);
    return res.status(500).send(R.ERROR_MESSAGE.JTW_TOKEN_AUTH_ERROR);
  }

  return;
};