import { Entries } from '../models';
import { DataService } from './data-service';

export class EntriesDataService extends DataService {
  constructor() {
    super(Entries);
  }
  public getByID = (id: string) => this.model.query().findOne({ id });
  public getByUserIdAndTimeRange = (user_id: string, startTime: Date, endTime: Date) =>
    this.model.query().where('user_id', user_id).whereBetween('created_at', [startTime, endTime]);
  // @ts-ignore
  public updateActivityTime = (id: string, time: number) => this.model.query().patch({ activity_time: time }).findById(id);

  public getByUserIdAndTimeRangeSum = (user_id: string, type: string, startTime: Date, endTime: Date) =>
    this.model
      .query()
      .where('user_id', user_id)
      .andWhere('type', type) // Add condition for 'type'
      .whereBetween('created_at', [startTime, endTime])
      .sum('activity_time');
  public getByUserIdAndTimeRangeByType = (user_id: string, type: string, startTime: Date, endTime: Date) =>
    this.model.query().where('user_id', user_id).andWhere('type', type).whereBetween('created_at', [startTime, endTime]);
}
