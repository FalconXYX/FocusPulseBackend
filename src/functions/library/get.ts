import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';

import { APIGatewayProxyResult, Context } from 'aws-lambda';
import createError from 'http-errors';
import { validate as uuidValidate } from 'uuid';

import { ds } from '../../data-services';
import { okReturn } from '../../lib/helper';
import { APIGatewayProxyEventMiddyNormalised } from '../../lib/types';

const baseHandler = async (event: APIGatewayProxyEventMiddyNormalised, _context: Context): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters;

  if (!uuidValidate(id || '')) {
    throw new createError.BadRequest('Invalid ID');
  }

  const library = await ds.library.get({ id }).withGraphFetched('books');
  if (library) {
    return okReturn(JSON.stringify(library));
  }

  throw new createError.NotFound('Library not found');
};

export const handler = middy(baseHandler).use(jsonBodyParser()).use(httpErrorHandler());
