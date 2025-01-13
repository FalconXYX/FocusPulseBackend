import middy from '@middy/core';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
//import { NIL as NIL_UUID } from 'uuid';

import { APIGatewayProxyResult, Context } from 'aws-lambda';

import { ds } from '../../data-services';
import { okReturn } from '../../lib/helper';
import { APIGatewayProxyEventMiddyNormalised } from '../../lib/types';

import { entriesCreateSchema as eventSchema } from '../schemas';
import { logUserEvent } from 'src/data-services/services/audit-log-data-service';
import { AUDIT_EVENTS } from 'src/data-services/models/audit-log';

interface EntryBody {
  securityCode: string;
  user_id: string;
  type: string;
  activity_time: number;
}

const baseHandler = async (event: APIGatewayProxyEventMiddyNormalised<EntryBody>, _context: Context): Promise<APIGatewayProxyResult> => {
  let { securityCode, user_id, type, activity_time } = event.body;
  user_id = '00000000-0000-0000-0000-000000000000 ';
  // do security code validation here

  const data = { type, activity_time, user_id };
  const entry = await ds.entry.create(data);
  await logUserEvent(AUDIT_EVENTS.ENTRY_ADDED, data);
  console.log('Created new entry:', entry);

  return okReturn(JSON.stringify(entry));
};

export const handler = middy(baseHandler).use(jsonBodyParser()).use(validator({ eventSchema })).use(httpErrorHandler());
