import express from 'express';
import { AuthChecker } from './middlewares/auth.middleware';
import { Logger } from '../infrastructure/logger';
import { R } from '../infrastructure/resources';
import { LoginService } from '../domain/service/login.service';
import { SmsTokenService } from '../domain/service/sms-token.service';
import { jwtHelper } from '../helpers/jwt.helper';

const router = express.Router();

function getLoginService(): LoginService {
  const smsService = new SmsTokenService();
  return new LoginService(smsService);
}

if (process.env.NODE_ENV !== R.ENV.PRODUCTION) {
  router.get('/', (_, res) => {
    res.send(R.OK).end();
  });
}

router.post('/login', async (req, res) => {
  try {
    const deviceId = req.headers[R.REQUEST_HEADERS.DEVICE_ID] as string;
    const deviceLocation = req.headers[R.REQUEST_HEADERS.DEVICE_LOCATION] as string;
    const email = req.body.email;
    const password = req.body.password;
    const smsToken = req.body.smsToken;

    const loginService = getLoginService();
    const token = await loginService.login(email, password, deviceId, smsToken, deviceLocation);
    res.json({token}).end();
  } catch (err) {
    Logger.error(err);
    if (err.name === R.ERROR_TYPE.NOT_AUTHORIZED_ERROR) {
      res.status(401).send(err.message);
      return;
    }

    if (err.name === R.ERROR_TYPE.TOO_MANY_LOGIN_ATTEMPTS_ERROR) {
      res.status(429).send(err.message);
      return;
    }
  
    if (process.env.NODE_ENV === R.ENV.PRODUCTION) {
        res.status(500).send(R.ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
        return;
    }
  
    res.status(500).send(err.message);
  }
});

router.post('/sendtoken', async (req, res) => {
  try {
    const deviceId = req.headers[R.REQUEST_HEADERS.DEVICE_ID] as string;
    const email = req.body.email;
    const password = req.body.password;

    const loginService = getLoginService();
    const response = await loginService.send2fa(email, password, deviceId);
    let message = `(XX) XXXXX-${response.userPhone.slice(7, 11)}`
    
    if (process.env.NODE_ENV === R.ENV.DEVELOPMENT) {
      message += `[${response.smsToken}]`
    }

    res.json({userPhone: message}).end();
  } catch (err) {
    Logger.error(err);
    if (err.name === R.ERROR_TYPE.NOT_AUTHORIZED_ERROR) {
      res.status(401).send(err.message);
      return;
    }

    if (err.name === R.ERROR_TYPE.TOO_MANY_LOGIN_ATTEMPTS_ERROR) {
      res.status(429).send(err.message);
      return;
    }
  
    if (process.env.NODE_ENV === R.ENV.PRODUCTION) {
        res.status(500).send(R.ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
        return;
    }
  
    res.status(500).send(err.message);
  }
});

router.post('/refreshtoken', async (req, res) => {
  try {
    const oldToken = req.headers[R.REQUEST_HEADERS.ACCESS_TOKEN] as string;
    const deviceId = req.headers[R.REQUEST_HEADERS.DEVICE_ID] as string;

    const newToken = await jwtHelper.refreshJWTToken(oldToken, deviceId);
    res.json({ newToken }).end();
  } catch (err) {
    Logger.error(err);
    if (err.name === R.ERROR_TYPE.NOT_AUTHORIZED_ERROR) {
      res.status(401).send(err.message);
      return;
    }

    if (err.name === R.ERROR_TYPE.TOO_MANY_LOGIN_ATTEMPTS_ERROR) {
      res.status(429).send(err.message);
      return;
    }

    if (err.name === R.ERROR_TYPE.JSON_WEB_TOKEN_ERROR) {
      res.status(401).send(R.ERROR_MESSAGE.NOT_AUTHORIZED);
      return;
    }
  
    if (process.env.NODE_ENV === R.ENV.PRODUCTION) {
        res.status(500).send(R.ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
        return;
    }
  
    res.status(500).send(err.message);
  }
});

router.post('/logout', AuthChecker, async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const loginService = getLoginService()
    loginService.logout(sessionId);
    res.sendStatus(200).end();
  } catch (err) {
    Logger.error(err);
    if (err.name === R.ERROR_TYPE.NOT_AUTHORIZED_ERROR) {
      res.status(401).send(err.message);
      return;
    }

    if (err.name === R.ERROR_TYPE.TOO_MANY_LOGIN_ATTEMPTS_ERROR) {
      res.status(429).send(err.message);
      return;
    }

    if (process.env.NODE_ENV === R.ENV.PRODUCTION) {
        res.status(500).send(R.ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
        return;
    }
  
    res.status(500).send(err.message);
  }
});

module.exports = router;