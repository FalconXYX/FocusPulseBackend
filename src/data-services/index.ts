import { EntriesDataService } from './services/entries-data-service';
import { UserDataService } from './services/user-data-service';

import { Database } from '../lib/database';

// Instantiate database when importing data service.
// TODO(ikeviny): Ensure singleton constructor?
new Database();

export const ds = {
  entry: new EntriesDataService(),
  user: new UserDataService(),
};
