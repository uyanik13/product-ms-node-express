import { Sequelize } from 'sequelize-typescript';

const databaseHost: string = `${process.env.DB_HOST}`;
const databaseName: string = `${process.env.DB_DATABASE}`;
const databaseUser: string = `${process.env.DB_USERNAME}`;
const databasePassword: string = `${process.env.DB_PASSWORD}`;
const databasePort: number = parseInt(process.env.DB_PORT || '3306');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: databaseHost,
  port: databasePort,
  username: databaseUser,
  password: databasePassword,
  database: databaseName,
  models: [__dirname + '/../api/**/*.model.ts'], // Adjust the path to where your models are located
  logging: true,
});

export default sequelize;

