import express from 'express';
import { AuthChecker } from './middlewares/auth.middleware';
import { Logger } from '../infrastructure/logger';
import { R } from '../infrastructure/resources';
import { QuotaGuard } from './middlewares/quota-guard.middleware';
import { PaymentService } from '../domain/service/payment.service';
import { PagedResponse } from '../infrastructure/paged-response';
import { EqualizationService } from '../domain/service/equalization.service';

const router = express.Router();

router.get('/', AuthChecker, QuotaGuard, (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const service = new EqualizationService();
    const summary = service.getSummarry(sessionId);
    res.json(summary);
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

router.get('/:id/payments', AuthChecker, QuotaGuard, (req, res) => {
  try {
    const equalizationId = req.params.id;
    const page: number = parseInt(req.query.page || '1');
    // const sessionId = req.params.sessionId;
    const service = new PaymentService();
    const pageSize = 1000;
    const { data, count }  = service.get(equalizationId, page - 1, pageSize) || { data: [], count: 0};
    res.json(new PagedResponse(page,
      pageSize,
      Math.ceil(count || 0 / pageSize),
      data));
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