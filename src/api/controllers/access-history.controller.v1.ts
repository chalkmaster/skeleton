import express from 'express';
import { AuthChecker } from './middlewares/auth.middleware';
import { Logger } from '../infrastructure/logger';
import { R } from '../infrastructure/resources';
import { QuotaGuard } from './middlewares/quota-guard.middleware';
import { PagedResponse } from '../infrastructure/paged-response';
import { AuditService } from '../domain/service/audit.service';

const router = express.Router();

router.get('/', AuthChecker, QuotaGuard, (req, res) => {
  try {
    const resource = req.query.resource || '';
    const page = parseInt(req.query.page || '1');
    // const sessionId = req.params.sessionId;
    const service = new AuditService();
    const pageSize = 1000;
    const { data, count }  = service.get(resource, page - 1, pageSize) || { data: [], count: 0};
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