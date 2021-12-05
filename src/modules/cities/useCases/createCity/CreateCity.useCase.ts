import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ErrorCodesHttp } from '../../../../shared/errors/ErrorCodesHttp';
import { CreateCityDTO } from '../../dtos/CreateCityDTO';
import { ICitiesRepository } from '../../repositories/ICitiesRepository';

@injectable()
export class CreateCityUseCase {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ name, state }: CreateCityDTO) {
    const CITY_ALREADY_EXISTS_IN_STATE =
      await this.citiesRepository.existsByNameAndState(name, state);

    if (CITY_ALREADY_EXISTS_IN_STATE) {
      throw new AppError(
        'This city already exists in the state.',
        ErrorCodesHttp.CONFLICT,
      );
    }

    const city = await this.citiesRepository.create({ name, state });

    if (!city) {
      throw new AppError(
        'Internal server error.',
        ErrorCodesHttp.INTERNAL_SERVER,
      );
    }

    return city;
  }
}
