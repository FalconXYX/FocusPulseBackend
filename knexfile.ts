const MIGRATIONS_DIR = './database/migrations';
const SEEDS_DIR = './database/seeds';

// commonjs export for knex lib
export default {
  development: {
    client: 'pg',
    connection: 'postgresql://postgres:postgres@localhost:5432/postgres?schema=public',
    migrations: {
      directory: MIGRATIONS_DIR,
      extension: 'ts',
      loadExtensions: ['.ts'],
    },
    seeds: {
      directory: SEEDS_DIR,
      loadExtensions: ['.ts'],
    },
  },

  staging: {
    client: 'pg',
    connection: 'postgresql://postgres:postgres@localhost:5432/postgres?schema=public',
  },

  production: {
    client: 'pg',
    connection: 'postgresql://postgres:postgres@localhost:5432/postgres?schema=public',
  },
};
