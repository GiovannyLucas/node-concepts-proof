import { v4 as uuid } from 'uuid';

import { AppError } from '../../../../shared/errors/AppError';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { CreateCityDTO } from '../../../cities/dtos/CreateCityDTO';
import { CitiesRepositoryInMemory } from '../../../cities/repositories/in-memory/CitiesRepositoryInMemory';
import { CreateClientDTO } from '../../dtos/CreateClientDTO';
import { ClientsRepositoryInMemory } from '../../repositories/in-memory/ClientsRepositoryInMemory';
import { CreateClientUseCase } from './CreateClient.useCase';

describe('Create Client Use Case', () => {
  let clientsRepositoryInMemory: ClientsRepositoryInMemory;
  let citiesRepositoryInMemory: CitiesRepositoryInMemory;
  let createClientUseCase: CreateClientUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(
      citiesRepositoryInMemory,
      clientsRepositoryInMemory,
    );
  });

  it('should be able to create a new client', async () => {
    const cityToCreate: CreateCityDTO = {
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    };

    const { id: city_id } = await citiesRepositoryInMemory.create(cityToCreate);

    const clientToCreate: CreateClientDTO = {
      full_name: 'Francisco José',
      gender: 'M',
      age: 20,
      born_date: new Date(2000, 10, 1),
      city_living_id: city_id,
    };

    const client = await createClientUseCase.execute(clientToCreate);

    expect(client.id).not.toBeFalsy();
    expect(client.created_at).not.toBeFalsy();
    expect(client.version).toBe(0);
  });

  it('should not be able create new client if the city dont exists', async () => {
    const randomCityId = uuid();

    const clientToCreate: CreateClientDTO = {
      full_name: 'Francisco José',
      gender: 'M',
      age: 20,
      born_date: new Date(2000, 10, 1),
      city_living_id: randomCityId,
    };

    const createClient = createClientUseCase.execute(clientToCreate);

    await expect(createClient).rejects.toEqual(
      new AppError('City not found.', HttpCodes.NOT_FOUND),
    );
  });

  it('should not be able to create a new client by some internal problem', async () => {
    const cityToCreate: CreateCityDTO = {
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    };

    const { id: city_id } = await citiesRepositoryInMemory.create(cityToCreate);

    const wrongWayToCreateClient: Partial<CreateClientDTO> = {
      city_living_id: city_id,
    };

    const tryCreateWrongClient = createClientUseCase.execute(
      wrongWayToCreateClient as CreateClientDTO,
    );

    await expect(tryCreateWrongClient).rejects.toBeInstanceOf(AppError);
    await expect(tryCreateWrongClient).rejects.toEqual(
      new AppError('Error to create the client.', HttpCodes.INTERNAL_SERVER),
    );
  });
});
