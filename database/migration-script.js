/*
 *  This script is for running Knex migrations against production or staging databases.
 *  Do not run this script on its own, see README.md for the npm commands to use.
 */

const fs = require('fs');
const tunnel = require('tunnel-ssh');
const knex = require('knex');

const config = require('./ssh-tunnel-config.json')[process.env.NODE_ENV];

const tunnelConfig = {
  // bastion ssh config
  host: config.sshHost,
  port: 22,
  username: config.sshUsername,
  privateKey: fs.readFileSync(config.sshPrivateKeyPath),

  // db server config
  dstHost: config.dbHost,
  dstPort: 3306,

  // local host config
  localHost: '127.0.0.1',
  localPort: 5000,
};

// connect to the database through a bastion server using a SSH tunnel
tunnel(tunnelConfig, (error, server) => {
  if (error) {
    console.log(error);
    process.exit(-1);
  }

  // create a connection to the database
  const connection = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: '5000',
      user: config.dbUsername,
      password: config.dbPassword,
      database: config.dbName,
    },
    migrations: {
      directory: './database/migrations',
    },
  });

  // run compiled migration files (.js)
  connection.migrate
    .latest({
      loadExtensions: ['.ts'],
    })
    .then(() => {
      console.log('Migrations successfully run.');
      process.exit(0);
    })
    .catch(e => {
      console.log(e);
      process.exit(-1);
    });
});
