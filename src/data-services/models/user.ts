import { mixin, snakeCaseMappers } from 'objection';

import schema from './schemas/user.json';
import { BaseModel } from './base-model';

export class User extends mixin(BaseModel) {
  // Model metadata
  public static override tableName = 'users';
  public static override columnNameMappers = snakeCaseMappers();
  public static override jsonSchema = schema;

  // Model fields
  public email!: string;
  public user_token!: string;
  public username!: string;
  public streaks_started!: number;
  public streaks_completed!: number;
}
