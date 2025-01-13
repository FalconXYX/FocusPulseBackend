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

async function loopDays(startDate: Date, endDate: Date, type: string, user_id: string): Promise<{ [key: string]: number }> {
  const result: { [key: string]: number } = {};
  const entries = await ds.entry.getByUserIdAndTimeRangeByType(user_id, type, startDate, endDate);
  entries.forEach(entry => {
    if (entry.createdAt) {
      let date = new Date(entry.createdAt);
      //strip date to just the day month year
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

      // if date is in the result object, increment the value by entry.activity_time otherwise set it to entry.activity_time
      if (result[date.toDateString()]) {
        // @ts-ignore
        result[date.toDateString()] += entry.activityTime;
      } else {
        // @ts-ignore
        result[date.toDateString()] = entry.activityTime;
      }
    }
  });

  return result;
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
  const streakDays = await loopDays(startTime, endTime, 'streak', user_id);
  const idleDays = await loopDays(startTime, endTime, 'idle', user_id);
  const breakDays = await loopDays(startTime, endTime, 'break', user_id);

  console.log('Got Data', streakDays);

  return okReturn(JSON.stringify({ streakDays, idleDays, breakDays }));
};

export const handler = middy(baseHandler).use(jsonBodyParser()).use(validator({ eventSchema })).use(httpErrorHandler());
