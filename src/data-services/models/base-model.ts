import { Model, ModelOptions, QueryContext, ModelObject, CloneOptions } from 'objection';
import { v4 as uuid4 } from 'uuid';

/*
 *  Base class for all data models.
 */
export class BaseModel extends Model {
  public id?: string;
  public createdAt?: string;
  public updatedAt?: string;
  public deletedAt?: string;
  public isDeleted?: boolean;

  /**
   * Overridable pre-insert method that generates a UUID4 for the model's ID,
   * and sets the createdAt and updatedAt fields to now.
   */
  public override async $beforeInsert(queryContext: QueryContext): Promise<void> {
    await super.$beforeInsert(queryContext);
    this.id = uuid4();
    const now = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
  }

  /** Overridable pre-update method that sets the updatedAt value to the current time. */
  public override async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext): Promise<void> {
    await super.$beforeUpdate(opt, queryContext);
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Returns a JSON representation of the model, with metadata fields
   * (ie. updatedAt, createdAt, and deletedAt) stripped from the object.
   */
  public override toJSON(opt?: CloneOptions): ModelObject<this> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = super.toJSON(opt);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete json.updatedAt;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete json.createdAt;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete json.deletedAt;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return json;
  }
}
