import { Knex } from "knex";
import { NIL as NIL_UUID } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("libraries").del();

    // Inserts seed entries
    await knex("libraries").insert([
        {
            id: NIL_UUID,
            name: "My Books",
            description: "A bunch of different books. Nice!",
            created_at: new Date(),
            updated_at: new Date(),
        }
    ]);
};
