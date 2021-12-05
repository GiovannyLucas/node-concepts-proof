import { getRepository, Repository } from 'typeorm';

import { CreateCityDTO } from '../../../dtos/CreateCityDTO';
import { PaginationDTO } from '../../../dtos/PaginationDTO';
import { ICitiesRepository } from '../../../repositories/ICitiesRepository';
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
    const [{ exists: cityAlreadyExistsInState }] = await this.repository.query(
      'SELECT EXISTS(SELECT 1 FROM public.cities WHERE state = $1 AND name = $2)',
      [state, name],
    );

    return cityAlreadyExistsInState;
  }
}
