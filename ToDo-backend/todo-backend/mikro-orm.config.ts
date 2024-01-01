import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { config } from 'dotenv';
import { Category } from 'src/category/entities/category.entity';
import { Todo } from 'src/todo/entities/todo.entity';
config();
// import * as dotenv from 'dotenv';
// dotenv.config();

const dbConfig: MikroOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: 'MyPass',
  dbName: process.env.DB_NAME,
  debug: true,
  entities: [Category, Todo],
  loadStrategy: LoadStrategy.JOINED,
  migrations: {
    pathTs: 'src/migrations',
    path: 'dist/migrations',
  },
  seeder: {
    pathTs: 'src/seeders',
    path: 'dist/seeders',
  },
};

export default dbConfig;
