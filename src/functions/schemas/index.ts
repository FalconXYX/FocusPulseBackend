// This file is responsible for precompiling and exporting JSON Schemas for Middy eventSchemas.

import { default as Ajv } from 'ajv';

import entries from '../../data-services/models/schemas/entries.json';
import user from '../../data-services/models/schemas/user.json';

const ajv = new Ajv();

// For each of the model-defined schemas, we need to perform the following
// transformation:
// - If the schema has a single property A, the new schema should have
//   property "body" with type object, and the properties of that object
//   (including the required field) should be A.
function transformModelSchema(schema: Record<string, unknown>): Ajv.ValidateFunction {
  // TODO(ikeviny): This can also strip out some of the validation stuff that Middy doesn't understand.
  const middySchema = {
    type: 'object',
    properties: {
      body: schema,
    },
  };

  return ajv.compile(middySchema);
}

export const entriesCreateSchema = transformModelSchema(entries);
export const userCreateSchema = transformModelSchema(user);
