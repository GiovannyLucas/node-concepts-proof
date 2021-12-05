import { inject, injectable } from 'tsyringe';

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
      throw new Error('This city already exists in the state.');
    }

    const city = await this.citiesRepository.create({ name, state });

    if (!city) {
      throw new Error('Internal server error.');
    }

    return city;
  }
}
