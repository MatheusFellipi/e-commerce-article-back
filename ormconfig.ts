const ORMConfig = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'tuffi.db.elephantsql.com',
  username: process.env.DB_USERNAME || 'bgnhmkeo',
  password: process.env.DB_PASSWORD || 'FNkMPRIWw_j9DHNdzWVdC0_ynnyn8ihp',
  database: process.env.DB_DATABASE || 'bgnhmkeo',
  entities: ['./src/Modules/**/Entities/*.ts'],
  migrations: ['./src/Shared/Infra/Typeorm/Migrations/*.ts'],
  cli: {
    migrationsDir: './src/Shared/Infra/Typeorm/Migrations',
    entitiesDir: 'src/Entities',
  },
};

module.exports = ORMConfig;
