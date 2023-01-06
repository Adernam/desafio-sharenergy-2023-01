import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Client } from "./entity/client.entity";

export const dataSource = new DataSource({
  type: "mongodb",
  host: "mongo",
  port: 27017,
  database: "sharenergy",
  synchronize: true,
  logging: false,
  entities: [User, Client],
  migrations: [],
  subscribers: [],
});
