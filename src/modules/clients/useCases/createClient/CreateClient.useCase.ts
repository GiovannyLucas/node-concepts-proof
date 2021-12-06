import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { ICitiesRepository } from '../../../cities/repositories/ICitiesRepository';
import { CreateClientDto } from '../../dtos/CreateClientDTO';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject('CITIES_REPOSITORY')
    private citiesRepository: ICitiesRepository,
    @inject('CLIENTS_REPOSITORY')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(clientToCreate: CreateClientDto) {
    const cityAlreadyExists = await this.citiesRepository.existsById(
      clientToCreate.city_living_id,
    );

    if (!cityAlreadyExists) {
      throw new AppError('City not found.', HttpCodes.NOT_FOUND);
    }

    const client = await this.clientsRepository.create(clientToCreate);

    if (!Object.keys(client).length) {
      throw new AppError(
        'Error to create the client.',
        HttpCodes.INTERNAL_SERVER,
      );
    }

    return client;
  }
}
