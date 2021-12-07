import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { CreateCityDTO } from '../../dtos/CreateCityDTO';
import { ICitiesRepository } from '../../repositories/ICitiesRepository';

@injectable()
export class CreateCityUseCase {
  constructor(
    @inject('CITIES_REPOSITORY')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ name, state }: CreateCityDTO) {
    const cityAlreadyExistsInState =
      await this.citiesRepository.existsByNameAndState(name, state);

    if (cityAlreadyExistsInState) {
      throw new AppError(
        'This city already exists in the state.',
        HttpCodes.CONFLICT,
      );
    }

    const city = await this.citiesRepository.create({ name, state });

    if (!Object.keys(city).length) {
      throw new AppError(
        'Error to create the city.',
        HttpCodes.INTERNAL_SERVER,
      );
    }

    return city;
  }
}
