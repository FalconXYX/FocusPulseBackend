import middy from '@middy/core';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';

import { APIGatewayProxyResult, Context } from 'aws-lambda';

import { ds } from '../../data-services';
import { okReturn } from '../../lib/helper';
import { APIGatewayProxyEventMiddyNormalised } from '../../lib/types';

import { libraryCreateSchema as eventSchema } from '../schemas';
import { logUserEvent } from 'src/data-services/services/audit-log-data-service';
import { AUDIT_EVENTS } from 'src/data-services/models/audit-log';

interface LibraryBody {
  name: string;
  description?: string;
}

const baseHandler = async (event: APIGatewayProxyEventMiddyNormalised<LibraryBody>, _context: Context): Promise<APIGatewayProxyResult> => {
  const { name, description } = event.body;

  const data = { name, description };
  const library = await ds.library.create(data);
  await logUserEvent(AUDIT_EVENTS.LIBRARY_ADDED, data);
  console.log('Created new library');

  return okReturn(JSON.stringify(library));
};

export const handler = middy(baseHandler).use(jsonBodyParser()).use(validator({ eventSchema })).use(httpErrorHandler());
