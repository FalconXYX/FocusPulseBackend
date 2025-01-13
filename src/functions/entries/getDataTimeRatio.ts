import middy from '@middy/core';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
//import { NIL as NIL_UUID } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { APIGatewayProxyResult, Context } from 'aws-lambda';
import createError from 'http-errors';

import { ds } from '../../data-services';
import { okReturn } from '../../lib/helper';
import { APIGatewayProxyEventMiddyNormalised } from '../../lib/types';

import { entriesCreateSchema as eventSchema } from '../schemas';

interface EntryBody {
  securityCode: string;
  user_id: string;
  timeRange: string;
}
function getStartTime(timeRange: string): Date {
  const now = new Date();
  switch (timeRange) {
    case 'day':
      return new Date(now.setDate(now.getDate() - 1));
    case 'week':
      return new Date(now.setDate(now.getDate() - 7));
    case 'month':
      return new Date(now.setMonth(now.getMonth() - 1));
    case '6month':
      return new Date(now.setMonth(now.getMonth() - 1));
    case 'year':
      return new Date(now.setFullYear(now.getFullYear() - 1));
    case 'all':
      return new Date(0);
    default:
      return new Date();
  }
}
const baseHandler = async (event: APIGatewayProxyEventMiddyNormalised<EntryBody>, _context: Context): Promise<APIGatewayProxyResult> => {
  let { securityCode, user_id, timeRange } = event.body;
  user_id = '00000000-0000-0000-0000-000000000000';
  // do security code validation here
  if (!uuidValidate(user_id || '')) {
    throw new createError.BadRequest('Invalid ID');
  }
  const startTime = getStartTime(timeRange);
  const endTime = new Date();
  const sumStreakTime = await ds.entry.getByUserIdAndTimeRangeSum(user_id, 'streak', startTime, endTime);
  const sumIdleTime = await ds.entry.getByUserIdAndTimeRangeSum(user_id, 'idle', startTime, endTime);
  const sumBreakTime = await ds.entry.getByUserIdAndTimeRangeSum(user_id, 'break', startTime, endTime);
  // Call the data service (no changes to the service itself)

  // Handle the output after the service call
  const sumStreak = sumStreakTime && sumStreakTime[0] && (sumStreakTime[0] as any).sum ? parseInt((sumStreakTime[0] as any).sum, 10) : null;
  const sumIdle = sumIdleTime && sumIdleTime[0] && (sumIdleTime[0] as any).sum ? parseInt((sumIdleTime[0] as any).sum, 10) : null;
  const sumBreak = sumBreakTime && sumBreakTime[0] && (sumBreakTime[0] as any).sum ? parseInt((sumBreakTime[0] as any).sum, 10) : null;
  // Now `sumValue` is a valid number or null if not available
  console.log('Got Data', sumStreak, sumIdle, sumBreak);

  return okReturn(JSON.stringify({ sumStreak, sumIdle, sumBreak }));
};

export const handler = middy(baseHandler).use(jsonBodyParser()).use(validator({ eventSchema })).use(httpErrorHandler());
