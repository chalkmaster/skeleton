import { Logger } from './logger';
import { SessionHelper } from '../helpers/session.helper';
import { AuditData } from './audit-data';
import { AuditService } from '../domain/service/audit.service';

export class Auditter {
  static async register(sessionId: string, resource: string, values?: {}) {
    const userSession = await SessionHelper.getSession(sessionId);
    if (!userSession) return;
    Logger.debug(userSession);
    const auditData: AuditData = {
      accessedAt: new Date(),
      resource: resource,
      query: values,
      userName: userSession.user.userName,
      userEmail: userSession.user.userEmail,
      userDevice: userSession.deviceId,
      userLocation: userSession.deviceLocation,
    };
    const service = new AuditService();
    Logger.audit(auditData);
    service.save(auditData);
  }
}