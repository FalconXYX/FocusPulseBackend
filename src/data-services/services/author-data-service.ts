import { Author } from '../models';
import { DataService } from './data-service';

export class AuthorDataService extends DataService {
  constructor() {
    super(Author);
  }
}
