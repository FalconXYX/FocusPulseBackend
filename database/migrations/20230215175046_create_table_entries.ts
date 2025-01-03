import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('entries', table => {
    table.uuid('id').primary();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').notNullable();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.dateTime('deleted_at').nullable();

    table.integer('activity_time').notNullable();
    table.string('type').notNullable();
    // Foreign key column for user.
    table.uuid('user_id').references('id').inTable('users').onDelete('SET NULL').index();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('entries');
}
