import { Book } from '../models';
import { DataService } from './data-service';

export class BookDataService extends DataService {
  constructor() {
    super(Book);
  }
}
