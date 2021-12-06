import { v4 as uuid } from 'uuid';

import { AppError } from '../../../../shared/errors/AppError';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { CitiesRepositoryInMemory } from '../../../cities/repositories/in-memory/CitiesRepositoryInMemory';
import { ClientsRepositoryInMemory } from '../../repositories/in-memory/ClientsRepositoryInMemory';
import { RemoveClientUseCase } from './RemoveClient.useCase';

describe('Remove Client Use Case', () => {
  let citiesRepositoryInMemory: CitiesRepositoryInMemory;
  let clientsRepositoryInMemory: ClientsRepositoryInMemory;
  let removeClientUseCase: RemoveClientUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    removeClientUseCase = new RemoveClientUseCase(clientsRepositoryInMemory);
  });

  it('should be able remove a client', async () => {
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

    const clientIsDeleted = await removeClientUseCase.execute(id);

    expect(clientIsDeleted).toBe(true);
  });

  it('should not be able to delete a client who dont exists', async () => {
    const randomClientId = uuid();

    const removeClient = removeClientUseCase.execute(randomClientId);

    await expect(removeClient).rejects.toBeInstanceOf(AppError);
    await expect(removeClient).rejects.toEqual(
      new AppError('Client not found.', HttpCodes.NOT_FOUND),
    );
  });
});
