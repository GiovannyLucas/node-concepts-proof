import { CitiesRepositoryInMemory } from '../../repositories/in-memory/CitiesRepositoryInMemory';
import { FindCitiesUseCase } from './FindCities.useCase';

describe('Create City Use Case', () => {
  let citiesRepositoryInMemory: CitiesRepositoryInMemory;
  let findCitiesUseCase: FindCitiesUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    findCitiesUseCase = new FindCitiesUseCase(citiesRepositoryInMemory);
  });

  it('should be able list the cities without filter params', async () => {
    await citiesRepositoryInMemory.create({
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    });

    await citiesRepositoryInMemory.create({
      name: 'Gramado',
      state: 'Rio Grande do Sul',
    });

    const { cities, total } = await findCitiesUseCase.execute(
      {
        limit: 1,
        offset: 0,
      },
      {},
    );

    expect(total).toBe(2);
    expect(cities.length).toBe(1);
  });

  it('should be able list the cities in a state', async () => {
    const stateToFilter = 'Rio Grande do Norte';

    await citiesRepositoryInMemory.create({
      name: 'São Miguel',
      state: stateToFilter,
    });

    await citiesRepositoryInMemory.create({
      name: 'Gramado',
      state: 'Rio Grande do Sul',
    });

    const { cities, total } = await findCitiesUseCase.execute(
      {
        limit: 10,
        offset: 0,
      },
      {
        state: stateToFilter,
      },
    );

    expect(total).toBe(2);
    expect(cities.length).toBe(1);
    expect(cities[0].state).toBe(stateToFilter);
  });

  it('should be able list the cities passing a name', async () => {
    const cityToFilter = 'São Miguel';

    await citiesRepositoryInMemory.create({
      name: cityToFilter,
      state: 'Rio Grande do Norte',
    });

    await citiesRepositoryInMemory.create({
      name: 'Gramado',
      state: 'Rio Grande do Sul',
    });

    const { cities, total } = await findCitiesUseCase.execute(
      {
        limit: 10,
        offset: 0,
      },
      {
        name: cityToFilter,
      },
    );

    expect(total).toBe(2);
    expect(cities.length).toBe(1);
    expect(cities[0].name).toBe(cityToFilter);
  });

  it('should be able show a city passing the state and name', async () => {
    const stateToFilter = 'Rio Grande do Norte';
    const cityToFilter = 'São Miguel';

    await citiesRepositoryInMemory.create({
      name: cityToFilter,
      state: stateToFilter,
    });

    await citiesRepositoryInMemory.create({
      name: 'Gramado',
      state: 'Rio Grande do Sul',
    });

    const { cities, total } = await findCitiesUseCase.execute(
      {
        limit: 10,
        offset: 0,
      },
      {
        name: cityToFilter,
      },
    );

    expect(total).toBe(2);
    expect(cities.length).toBe(1);
    expect(cities[0].name).toBe(cityToFilter);
    expect(cities[0].state).toBe(stateToFilter);
  });
});
