import { CreateCityDTO } from '../dtos/CreateCityDTO';
import { PaginationDTO } from '../dtos/PaginationDTO';
import { City } from '../infra/typeorm/entities/City';

export interface ICitiesRepository {
  create(cityToCreate: CreateCityDTO): Promise<City>;
  find(
    name?: string,
    state?: string,
    pagination?: PaginationDTO,
  ): Promise<{ cities: City[]; total: number }>;
  showById(id: string): Promise<City>;
  findByState(state: string): Promise<City[]>;
  existsByNameAndState(name: string, state: string): Promise<boolean>;
}