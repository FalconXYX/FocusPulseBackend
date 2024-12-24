import { AuthorDataService } from './services/author-data-service';
import { BookDataService } from './services/book-data-service';
import { LibraryDataService } from './services/library-data-service';
import { UserDataService } from './services/user-data-service';

import { Database } from '../lib/database';

// Instantiate database when importing data service.
// TODO(ikeviny): Ensure singleton constructor?
new Database();

export const ds = {
  author: new AuthorDataService(),
  book: new BookDataService(),
  library: new LibraryDataService(),
  user: new UserDataService(),
};
