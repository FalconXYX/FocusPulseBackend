import { Model, snakeCaseMappers, QueryContext } from 'objection';

import schema from './schemas/audit-log.json';

export enum AUDIT_CONTEXT_TYPE {
  ADMIN = 'admin',
  USER = 'user',
}

export enum AUDIT_EVENTS {
  AUTHOR_ADDED = 'author_added',
  BOOK_ADDED = 'book_added',
  LIBRARY_ADDED = 'library_added',
  USER_ADDED = 'user_added',
}

export class AuditLog extends Model {
  // Model metadata
  public static override tableName = 'audit_logs';
  public static override columnNameMappers = snakeCaseMappers();
  public static override jsonSchema = schema;

  // Model fields
  public createdAt?: string;
  public event?: string;
  public context?: AUDIT_CONTEXT_TYPE;
  public data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Make `event` the primary key column for the audit log table.
  public static override get idColumn(): string {
    return 'event';
  }

  public override async $beforeInsert(queryContext: QueryContext): Promise<void> {
    await super.$beforeInsert(queryContext);
    this.createdAt = new Date().toISOString();
  }
}
