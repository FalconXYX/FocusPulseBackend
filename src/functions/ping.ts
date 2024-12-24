import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';

import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { okReturn } from '../lib/helper';
import { APIGatewayProxyEventMiddyNormalised } from '../lib/types';

// eslint-disable-next-line @typescript-eslint/require-await
const baseHandler = async (_event: APIGatewayProxyEventMiddyNormalised, _context: Context): Promise<APIGatewayProxyResult> => {
  return okReturn('Pong!');
};

export const handler = middy(baseHandler).use(jsonBodyParser()).use(httpErrorHandler());
