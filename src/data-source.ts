import "reflect-metadata";
import { DataSource } from "typeorm";
import { Country } from "./entity/Country";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: false,
  logging: ["query", "error"],
  entities: [Country],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    await AppDataSource.runMigrations();
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
