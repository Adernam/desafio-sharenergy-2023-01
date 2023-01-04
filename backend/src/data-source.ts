import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";

export const dataSource = new DataSource({
  type: "mongodb",
  host: "mongo",
  port: 27017,
  database: "sharenergy",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
