import { BaseModel } from '../models/base-model';

export class DataService {
  protected model: typeof BaseModel;

  constructor(model: typeof BaseModel) {
    this.model = model;
  }

  // TODO(ikeviny): Pass through transaction for update methods.

  // Per https://vincit.github.io/objection.js/api/query-builder/mutate-methods.html#insertandfetch,
  // chaining `returning('*')` to a regular insert saves one additional query when using Postgres.
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  public create = (data: Record<string, unknown>) => this.model.query().insert(data).returning('*');

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  public get(data: Record<string, unknown>) {
    // Filter out soft-deleted values.
    const query = { is_deleted: false, ...data };
    return this.model.query().findOne(query);
  }

  // Soft deletion methods and helpers.
  // TODO(ikeviny): Code in rollbacks

  /**
   * Performs a soft-deletion on a model by setting the `isDeleted` column to true,
   * and marking `deletedAt` with the current timestamp.
   *
   * Returns whether the deletion was successful.
   */
  public async delete(data: Record<string, unknown>): Promise<boolean> {
    const numDeleted = await this.model.query().findOne(data).patch({
      isDeleted: true,
      deletedAt: new Date().toISOString(),
    });

    return numDeleted === 1;
  }

  /**
   * Performs a hard-deletion on a model. Prefer `delete()` for normal deletion business logic.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  public hardDeleteById = (id: string) => this.model.query().deleteById(id);
}
