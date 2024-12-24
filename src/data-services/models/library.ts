import { mixin, snakeCaseMappers, Model } from 'objection';

import schema from './schemas/library.json';
import { Book } from './book';
import { BaseModel } from './base-model';

export class Library extends mixin(BaseModel) {
  // Model metadata
  public static override tableName = 'libraries';
  public static override columnNameMappers = snakeCaseMappers();
  public static override jsonSchema = schema;

  // Model relationships
  public static override relationMappings = {
    books: {
      relation: Model.HasManyRelation,
      modelClass: Book,
      join: {
        from: 'libraries.id',
        to: 'books.library_id',
      },
    },
  };

  // Model fields
  public name!: string;
  public description?: string;
}
