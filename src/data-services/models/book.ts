import { mixin, snakeCaseMappers, Model } from 'objection';

import schema from './schemas/book.json';
import { Author } from './author';
import { BaseModel } from './base-model';

export class Book extends mixin(BaseModel) {
  // Model metadata
  public static override tableName = 'books';
  public static override columnNameMappers = snakeCaseMappers();
  public static override jsonSchema = schema;

  // Model relationships
  public static override relationMappings = {
    author: {
      relation: Model.HasOneRelation,
      modelClass: Author,
      join: {
        from: 'books.author_id',
        to: 'authors.id',
      },
    },
  };

  // Model fields
  public title!: string;
}
