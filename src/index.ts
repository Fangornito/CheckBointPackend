import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolver/CountryResolver";
import { AppDataSource } from "./data-source";

async function bootstrap() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen({ port: 4000 });
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
