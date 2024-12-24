import { Knex } from "knex";
import { NIL as NIL_UUID, v4 as uuid4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("books").del();

    // Inserts seed entries
    await knex("books").insert([
        {
            id: uuid4(),
            title: "Of Mice and Men",
            library_id: NIL_UUID,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuid4(),
            title: "The Three Body Problem",
            library_id: NIL_UUID,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
};
