import { AuditLog, AUDIT_CONTEXT_TYPE, AUDIT_EVENTS } from '../models/audit-log';

/** Inserts an entry into the audit log corresponding to an admin taking action. */
export const logAdminEvent = async (event: AUDIT_EVENTS, data?: Record<string, unknown>): Promise<boolean> =>
  logEvent(AUDIT_CONTEXT_TYPE.ADMIN, event, data);

/** Inserts an entry into the audit log corresponding to a user taking action. */
export const logUserEvent = async (event: AUDIT_EVENTS, data?: Record<string, unknown>): Promise<boolean> =>
  logEvent(AUDIT_CONTEXT_TYPE.USER, event, data);

const logEvent = async (context: AUDIT_CONTEXT_TYPE, event: AUDIT_EVENTS, data?: Record<string, unknown>): Promise<boolean> => {
  await (data ? AuditLog.query().insert({ context, event, data }) : AuditLog.query().insert({ context, event }));

  return true;
};
