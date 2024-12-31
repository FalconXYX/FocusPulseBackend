import { Entries } from '../models';
import { DataService } from './data-service';

export class EntriesDataService extends DataService {
  constructor() {
    super(Entries);
  }
  public getByID = (id: string) => this.model.query().findOne({ id });
  public getByIdAndTimeRange = (id: string, startTime: Date, endTime: Date) =>
    this.model.query().where('id', id).whereBetween('created_at', [startTime, endTime]);
}
