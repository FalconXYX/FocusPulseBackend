import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('books', table => {
    table.uuid('id').primary()
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').notNullable();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.dateTime('deleted_at').nullable();

    table.string('title', 100).notNullable();

    // Foreign key columns.
    table.uuid('author_id').references('id').inTable('books').onDelete('SET NULL').index()
    table.uuid('library_id').references('id').inTable('libraries').onDelete('SET NULL').index()
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('books');
}
