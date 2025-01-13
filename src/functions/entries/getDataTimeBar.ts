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

async function loopDays(
  startDate: Date,
  endDate: Date,
  type: string,
  user_id: string,
): Promise<{ [hour: string]: { [date: string]: number } }> {
  const result: { [hour: string]: { entries: number; time: number } } = {};
  const entries = await ds.entry.getByUserIdAndTimeRangeByType(user_id, type, startDate, endDate);
  console.log('Entries', entries);
  entries.forEach(entry => {
    if (entry.createdAt) {
      let date = new Date(entry.createdAt);
      const hour = date.getHours();
      if (result[hour]) {
        result[hour].entries += 1;
        // @ts-ignore
        result[hour].time += entry.activityTime;
      } else {
        // @ts-ignore
        result[hour] = { entries: 1, time: entry.activityTime };
        // @ts-ignore
      }
      //strip date to just the day month year
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
