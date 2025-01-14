import middy from '@middy/core';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';

import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { ds } from '../data-services';
import { okReturn } from '../lib/helper';
import { APIGatewayProxyEventMiddyNormalised } from '../lib/types';

import { userCreateSchema as eventSchema } from './schemas';
import { logUserEvent } from 'src/data-services/services/audit-log-data-service';
import { AUDIT_EVENTS } from 'src/data-services/models/audit-log';

interface UserBody {
  email: string;
  user_token: string;
}

// TODO(ikeviny): APIGatewayProxyWithCognitoAuthorizerEvent
const baseHandler = async (event: APIGatewayProxyEventMiddyNormalised<UserBody>, _context: Context): Promise<APIGatewayProxyResult> => {
  const { email, user_token } = event.body;
  // do security code validation here

  const user = await ds.user.get({ email });
  if (user) {
    return okReturn(JSON.stringify(user));
  }

  const create = await ds.user.create({ email, user_token });
  await logUserEvent(AUDIT_EVENTS.USER_ADDED);
  console.log('Created new user');

  return okReturn(JSON.stringify(create));
};

export const handler = middy(baseHandler).use(jsonBodyParser()).use(validator({ eventSchema })).use(httpErrorHandler());
