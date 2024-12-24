import { mixin, snakeCaseMappers } from 'objection';

import schema from './schemas/author.json';
import { BaseModel } from './base-model';

export class Author extends mixin(BaseModel) {
  // Model metadata
  public static override tableName = 'authors';
  public static override columnNameMappers = snakeCaseMappers();
  public static override jsonSchema = schema;

  // Model fields
  public name?: string;
}
