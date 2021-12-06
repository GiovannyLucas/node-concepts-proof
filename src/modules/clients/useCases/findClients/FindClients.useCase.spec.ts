import { CitiesRepositoryInMemory } from '../../../cities/repositories/in-memory/CitiesRepositoryInMemory';
import { ClientsRepositoryInMemory } from '../../repositories/in-memory/ClientsRepositoryInMemory';
import { FindClientsUseCase } from './FindClients.useCase';

describe('Find Clients Use Case', () => {
  let citiesRepositoryInMemory: CitiesRepositoryInMemory;
  let clientsRepositoryInMemory: ClientsRepositoryInMemory;
  let findClientsUseCase: FindClientsUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    findClientsUseCase = new FindClientsUseCase(clientsRepositoryInMemory);
  });

  it('should be able list the cities without filter params', async () => {
    const { id: city_id } = await citiesRepositoryInMemory.create({
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    });

    await clientsRepositoryInMemory.create({
      full_name: 'Francisco José',
      gender: 'M',
      age: 21,
      born_date: new Date(2000, 10, 1),
      city_living_id: city_id,
    });

    await clientsRepositoryInMemory.create({
      full_name: 'José Francisco',
      gender: 'M',
      age: 22,
      born_date: new Date(1999, 10, 1),
      city_living_id: city_id,
    });

    const { clients, total } = await findClientsUseCase.execute(
      {
        limit: 1,
        offset: 0,
      },
      {},
    );

    expect(total).toBe(2);
    expect(clients.length).toBe(1);
  });

  it('should be able list the clients passing a name', async () => {
    const { id: city_id } = await citiesRepositoryInMemory.create({
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    });

    await clientsRepositoryInMemory.create({
      full_name: 'Francisco José',
      gender: 'M',
      age: 21,
      born_date: new Date(2000, 10, 1),
      city_living_id: city_id,
    });

    await clientsRepositoryInMemory.create({
      full_name: 'José Francisco',
      gender: 'M',
      age: 22,
      born_date: new Date(1999, 10, 1),
      city_living_id: city_id,
    });

    await clientsRepositoryInMemory.create({
      full_name: 'Chico Zé',
      gender: 'M',
      age: 22,
      born_date: new Date(1999, 10, 1),
      city_living_id: city_id,
    });

    const { clients, total } = await findClientsUseCase.execute(
      {
        limit: 1,
        offset: 0,
      },
      {
        name: 'José',
      },
    );

    expect(total).toBe(2);
    expect(clients.length).toBe(1);
  });
});
