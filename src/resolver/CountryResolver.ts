import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entity/Country";
import { AppDataSource } from "../data-source";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await AppDataSource.getRepository(Country).find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    return await AppDataSource.getRepository(Country).findOneBy({ code });
  }

  @Query(() => [Country])
  async countriesByContinent(@Arg("continent") continent: string): Promise<Country[]> {
    return await AppDataSource.getRepository(Country).findBy({ continent });
  }

  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Country> {
    const country = AppDataSource.getRepository(Country).create({ code, name, emoji, continent });
    return await AppDataSource.getRepository(Country).save(country);
  }
}
