# No-Ops Serverless Starter Project

This is a starter project built on the following technologies:

- AWS Lambda
- Serverless
- PostgreSQL
- TypeScript
  - Objection ORM
  - Knex

TODO(ikeviny): A diagram, perhaps

## Requirements

- Node & `npm`
- Postgres (`brew install postgresql@14`)
- `serverless` CLI (`npm install -g serverless`)

## Installation

Install dependencies.

```sh
npm install
```

## Usage

```sh
npm start
```

> Note: when running Serverless locally, due to the way that Lambda layers are connected, it will output a `Warning: Invalid configuration encountered` warning to the console. This can safely be ignored, as it is only an artifact that exists locally.

## Migrations

```sh
npm run db:migrate:new ${NAME}

# Edit migration...

npm run db:migrate
```

## Deployment

Before the first deployment, there are a few things that need to be created on the AWS side of things:

- An S3 bucket needs to be created with the name `starter-deployments` to house the Lambda layer uploads.
- VPC
- Bastion server
- Postgres DB

```sh
npm run deploy
```

Copy over the env.yml and the serverless.yml from the inner function repositories and then `sls deploy`
