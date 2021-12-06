import { getRepository, Repository } from 'typeorm';

import { IValidPaginationParams } from '../../../../../shared/validators/paginationParams';
import { CreateCityDTO } from '../../../dtos/CreateCityDTO';
import { ICitiesRepository } from '../../../repositories/ICitiesRepository';
import { City } from '../entities/City';

export class CitiesRepository implements ICitiesRepository {
  private readonly repository: Repository<City>;

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
    { limit, offset }: IValidPaginationParams,
    { state, name }: { state?: string; name?: string },
  ): Promise<{ cities: City[]; total: number }> {
    const nameCaseWhere = `CASE
        WHEN (:name = '%%') THEN TRUE
        ELSE name ILIKE :name
      END`;

    const stateCaseWhere = `CASE
        WHEN (:state = '%%') THEN TRUE
        ELSE state ILIKE :state
      END`;

    const [cities, total] = await this.repository
      .createQueryBuilder()
      .where(nameCaseWhere, { name: `%${name || ''}%` })
      .andWhere(stateCaseWhere, { state: `%${state || ''}%` })
      .skip(offset)
      .take(limit)
      .orderBy({ name: 'ASC', state: 'ASC' })
      .getManyAndCount();

    return { cities, total };
  }

  async existsById(id: string): Promise<boolean> {
    const [{ exists: cityAlreadyExists }] = await this.repository.query(
      'SELECT EXISTS(SELECT 1 FROM public.cities WHERE id = $1)',
      [id],
    );

    return cityAlreadyExists;
  }

  async existsByNameAndState(name: string, state: string): Promise<boolean> {
    const [{ exists: cityAlreadyExistsInState }] = await this.repository.query(
      'SELECT EXISTS(SELECT 1 FROM public.cities WHERE state = $1 AND name = $2)',
      [state, name],
    );

    return cityAlreadyExistsInState;
  }
}
