import { mixin, snakeCaseMappers, Model } from 'objection';

import schema from './schemas/entries.json';
import { User } from './user';
import { BaseModel } from './base-model';

export class Entries extends mixin(BaseModel) {
  // Model metadata
  public static override tableName = 'libraries';
  public static override columnNameMappers = snakeCaseMappers();
  public static override jsonSchema = schema;

  // Model relationships
  public static override relationMappings = {
    user_id: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'entries.user_id',
        to: 'users.id',
      },
    },
  };

  // Model fields
  public type!: string;
  public activity_time!: number;
}
