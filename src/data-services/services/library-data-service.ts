import { Library } from '../models';
import { DataService } from './data-service';

export class LibraryDataService extends DataService {
  constructor() {
    super(Library);
  }
}
