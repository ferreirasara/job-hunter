import "reflect-metadata"
import { DataSource } from "typeorm"
import { JobOpportunity } from "./entity/JobOpportunity"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "bnjg4frk1on7lxkduwli-postgresql.services.clever-cloud.com",
  port: 5432,
  username: "uqc28qnexpvdeu5m34o9",
  password: "OSV0x6guzFgccCcswBwis1JEH19pLi",
  database: "bnjg4frk1on7lxkduwli",
  synchronize: true,
  logging: false,
  entities: [JobOpportunity],
  migrations: [],
  subscribers: [],
})
