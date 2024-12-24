import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('audit_logs', table => {
    table.dateTime('created_at').notNullable();
    table.enu('context', ['admin', 'user']).notNullable();
    table.string('event', 32).notNullable();
    table.json('data').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('audit_logs');
}
