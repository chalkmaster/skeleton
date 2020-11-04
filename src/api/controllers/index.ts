import express from 'express';

const router = express.Router();

router.use('/api/v1/status', require('./status.controller.v1'));
router.use('/api/v1/auth', require('./auth.controller.v1'));
router.use('/api/v1/equalization', require('./equalization.controller.v1'));
router.use('/api/v1/accesshistory', require('./access-history.controller.v1'));
router.use('/api/v1/subrogation', require('./subrogation.controller.v1'));
router.use('/api/v1/settings', require('./settings.controller.v1'));

module.exports = router;