import { IValidPaginationParams } from 'shared/validators/paginationParams';

import { CreateCityDTO } from '../dtos/CreateCityDTO';
import { City } from '../infra/typeorm/entities/City';

export interface ICitiesRepository {
  create(cityToCreate: CreateCityDTO): Promise<City>;
  find(
    pagination: IValidPaginationParams,
    filters?: { state?: string; name?: string },
  ): Promise<{ cities: City[]; total: number }>;
  showById(id: string): Promise<City | undefined>;
  findByState(state: string): Promise<City[]>;
  existsByNameAndState(name: string, state: string): Promise<boolean>;
}
