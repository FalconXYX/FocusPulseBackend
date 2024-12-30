import { Knex } from 'knex';
import { NIL as NIL_UUID } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del();

  // Inserts seed entries
  await knex('user').insert([
    {
      id: NIL_UUID,
      created_at: new Date(),
      last_login: new Date(),
      username: 'ParthJ',
      email: 'parthkj6@gmail.com',
      user_token: '109123476617581578598',
      streaks_started: 1,
      streaks_completed: 0,
      is_admin: true,
    },
  ]);
}
