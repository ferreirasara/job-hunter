import "reflect-metadata"
import { DataSource } from "typeorm"
import { JobOpportunity } from "./entity/JobOpportunity"
require('dotenv').config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [JobOpportunity],
  migrations: [],
  subscribers: [],
})
