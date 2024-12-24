// Defines CASL abilities for authorization purposes.
import { defineAbility, createMongoAbility } from '@casl/ability';

import { Author, Book, User } from 'src/data-services/models';

type Actions = 'create' | 'delete' | 'read' | 'update';
type Subjects = Author | Book | User | 'Author' | 'Book' | 'User';

export const ability = createMongoAbility<[Actions, Subjects]>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const userAbility = (_user: Record<string, unknown>) =>
  defineAbility(can => {
    can('manage', 'Author');
    can('manage', 'Book');
  });

export default {};
