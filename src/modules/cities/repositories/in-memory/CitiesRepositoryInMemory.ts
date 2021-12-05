import { v4 as uuid } from 'uuid';

import { CreateCityDTO } from '../../dtos/CreateCityDTO';
import { PaginationDTO } from '../../dtos/PaginationDTO';
import { City } from '../../infra/typeorm/entities/City';
import { ICitiesRepository } from '../ICitiesRepository';

export class CitiesRepositoryInMemory implements ICitiesRepository {
  cities: City[] = [];

  async create({ name, state }: CreateCityDTO): Promise<City> {
    if (!name || !state) return {} as City;

    const city = new City();
    city.id = uuid();
    city.name = name;
    city.state = state;
    city.created_at = new Date();
    city.version = 0;

    this.cities.push(city);

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
    console.log(this.cities);

    const cityAlreadyExistsInState = this.cities.some(
      (city) => city.name === name && city.state === state,
    );

    return cityAlreadyExistsInState;
  }
}
