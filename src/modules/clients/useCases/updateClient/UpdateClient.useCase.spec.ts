import { v4 as uuid } from 'uuid';

import { AppError } from '../../../../shared/errors/AppError';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { CitiesRepositoryInMemory } from '../../../cities/repositories/in-memory/CitiesRepositoryInMemory';
import { ClientsRepositoryInMemory } from '../../repositories/in-memory/ClientsRepositoryInMemory';
import { UpdateClientUseCase } from './UpdateClient.useCase';

describe('Remove Client Use Case', () => {
  let citiesRepositoryInMemory: CitiesRepositoryInMemory;
  let clientsRepositoryInMemory: ClientsRepositoryInMemory;
  let updateClientUseCase: UpdateClientUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    updateClientUseCase = new UpdateClientUseCase(clientsRepositoryInMemory);
  });

  it('should be able update a client', async () => {
    const { id: city_id } = await citiesRepositoryInMemory.create({
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    });

    const { id } = await clientsRepositoryInMemory.create({
      full_name: 'Francisco José',
      gender: 'M',
      age: 21,
      born_date: new Date(2000, 10, 1),
      city_living_id: city_id,
    });

    const nameToUpdate = 'Francisco José da Silva';

    const updatedClient = await updateClientUseCase.execute(id, {
      name: nameToUpdate,
    });

    expect(updatedClient.full_name).toBe(nameToUpdate);
  });

  it('should not be able to update a client who dont exists', async () => {
    const randomClientId = uuid();

    const removeClient = updateClientUseCase.execute(randomClientId, {
      name: 'Jubileu',
    });

    await expect(removeClient).rejects.toBeInstanceOf(AppError);
    await expect(removeClient).rejects.toEqual(
      new AppError('Client not found.', HttpCodes.NOT_FOUND),
    );
  });
});
