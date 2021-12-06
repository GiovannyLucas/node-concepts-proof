import { v4 as uuid } from 'uuid';

import { AppError } from '../../../../shared/errors/AppError';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { CitiesRepositoryInMemory } from '../../../cities/repositories/in-memory/CitiesRepositoryInMemory';
import { ClientsRepositoryInMemory } from '../../repositories/in-memory/ClientsRepositoryInMemory';
import { ShowClientByIdUseCase } from './ShowClientById.useCase';

describe('Show Client By Id Use Case', () => {
  let citiesRepositoryInMemory: CitiesRepositoryInMemory;
  let clientsRepositoryInMemory: ClientsRepositoryInMemory;
  let showClientByIdUseCase: ShowClientByIdUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    showClientByIdUseCase = new ShowClientByIdUseCase(
      clientsRepositoryInMemory,
    );
  });

  it('should be able show a client passing the id', async () => {
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

    const client = await showClientByIdUseCase.execute(id);

    expect(client?.id).toBe(id);
  });

  it('should be able list the clients passing a name', async () => {
    const randomClientId = uuid();

    const showClient = showClientByIdUseCase.execute(randomClientId);

    await expect(showClient).rejects.toBeInstanceOf(AppError);
    await expect(showClient).rejects.toEqual(
      new AppError('Client not found.', HttpCodes.NOT_FOUND),
    );
  });
});
