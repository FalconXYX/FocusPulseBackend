import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').notNullable();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.dateTime('deleted_at').nullable();
    table.string('username').notNullable();
    table.string('email').unique();
    table.text('user_token').notNullable();
    table.integer('streaks_started').notNullable().defaultTo(0);
    table.integer('streaks_completed').notNullable().defaultTo(0);
    table.boolean('is_admin').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
