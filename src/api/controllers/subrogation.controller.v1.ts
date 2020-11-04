import express from 'express';
import { AuthChecker } from './middlewares/auth.middleware';
import { Logger } from '../infrastructure/logger';
import { R } from '../infrastructure/resources';

const router = express.Router();

router.get('/', AuthChecker, (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    res.send(sessionId);
  } catch (err) {
    Logger.error(err);
    if (err.name === R.ERROR_TYPE.NOT_AUTHORIZED_ERROR) {
        res.status(401).send(err.message);
        return;
    }
  
    if (process.env.NODE_ENV === R.ENV.PRODUCTION) {
        res.status(500).send(R.ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
        return;
    }
  
    res.status(500).send(err.message);
  }
});

router.post('/', AuthChecker, async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    res.send(sessionId);
  } catch (err) {
    Logger.error(err);
    if (err.name === R.ERROR_TYPE.NOT_AUTHORIZED_ERROR) {
        res.status(401).send(err.message);
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