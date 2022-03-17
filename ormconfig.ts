const ORMConfig = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./src/Modules/**/Entities/*.ts'],
  migrations: ['./src/Shared/Infra/Typeorm/Migrations/*.ts'],
  cli: {
    migrationsDir: './src/Shared/Infra/Typeorm/Migrations',
    entitiesDir: 'src/Entities',
  },
};

module.exports = ORMConfig