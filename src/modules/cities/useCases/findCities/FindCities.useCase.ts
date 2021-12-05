import { IValidPaginationParams } from 'shared/validators/paginationParams';
import { inject, injectable } from 'tsyringe';

import { ICitiesRepository } from '../../repositories/ICitiesRepository';

@injectable()
export class FindCitiesUseCase {
  constructor(
    @inject('CITIES_REPOSITORY')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(
    pagination: IValidPaginationParams,
    filters: { state?: string; name?: string },
  ) {
    const cities = await this.citiesRepository.find(pagination, filters);

    return cities;
  }
}
