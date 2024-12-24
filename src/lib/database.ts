import { Model } from 'objection';
import { knex, Knex } from 'knex';
import * as knexConfig from '../../knexfile';

/*
 *  Class for creating a database connection.
 */
export class Database {
  public knex?: Knex;

  constructor() {
    const env = process.env['NODE_ENV'];
    if (env !== undefined) {
      let connection = knexConfig.default.development.connection;
      switch (env) {
        case 'production':
          connection = knexConfig.default.production.connection;
          break;
        case 'staging':
          connection = knexConfig.default.staging.connection;
          break;
        default:
          break;
      }
      this.knex = knex({ client: 'pg', connection });
      Model.knex(this.knex);
    }
  }

  public destroy(): void {
    void this.knex?.destroy();
  }
}
