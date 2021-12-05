import { CreateCityDTO } from 'modules/cities/dtos/CreateCityDTO';
import { PaginationDTO } from 'modules/cities/dtos/PaginationDTO';
import { ICitiesRepository } from 'modules/cities/repositories/ICitiesRepository';
import { getRepository, Repository } from 'typeorm';

import { City } from '../entities/City';

export class CitiesRepository implements ICitiesRepository {
  private repository: Repository<City>;

  constructor() {
    this.repository = getRepository(City);
  }

  async create({ name, state }: CreateCityDTO): Promise<City> {
    const city = this.repository.create({
      name,
      state,
    });

    await this.repository.save(city);

    return city;
  }

  async find(
    name?: string,
    state?: string,
    pagination?: PaginationDTO,
  ): Promise<{ cities: City[]; total: number }> {
    throw new Error('Method not implemented.');
  }

  async showById(id: string): Promise<City | undefined> {
    throw new Error('Method not implemented.');
  }

  async findByState(state: string): Promise<City[]> {
    throw new Error('Method not implemented.');
  }

  async existsByNameAndState(name: string, state: string): Promise<boolean> {
    const cityAlreadyExistsInState = await this.repository.query(
      'SELECT TOP 1 id FROM public.city WHERE state = $1 AND name = $2',
      [state, name],
    );

    console.log(cityAlreadyExistsInState);

    return false;
  }
}
