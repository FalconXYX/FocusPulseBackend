import { Knex } from 'knex';
import { NIL as NIL_UUID } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('libraries').del();

  // Inserts seed entries
  await knex('entries').insert([
    {
      id: NIL_UUID,
      created_at: new Date(),
      updated_at: new Date(),
      activity_time: 30,
      type: 'streak',
      user_id: NIL_UUID,
    },
  ]);
}
