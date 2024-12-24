import { User } from '../models';
import { DataService } from './data-service';

export class UserDataService extends DataService {
  constructor() {
    super(User);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
  public getByEmail = (email: string) => this.model.query().findOne({ email });
}
