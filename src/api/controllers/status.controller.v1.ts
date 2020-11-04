import express from 'express';
import { ServiceStatus } from '../infrastructure/service-status.enum';

const router = express.Router();

router.get('/', async (_, res) => {
    res.json({
        API: ServiceStatus.ONLINE,
        DATABASE: ServiceStatus.UNREACHABLE,
        CACHE: ServiceStatus.UNREACHABLE,
        LOG_SERVER: ServiceStatus.UNREACHABLE,
        AUTH_SERVER : ServiceStatus.UNREACHABLE,
    }).end();
});

module.exports = router;