import { AuditData } from '../../infrastructure/audit-data';

export class AuditService {
  static data: AuditData[];
  constructor() {
    AuditService.data = AuditService.data || [];
  }
  get(resource: string, start: number, max: number) {
    if (!resource) return;

    return { data: AuditService.data.slice(start, Math.max((start + 1) * max, AuditService.data.length)),
             count: AuditService.data.length };
  }

  save(auditData: AuditData) {
    AuditService.data.push(auditData);
  }
}