import { CreateCityDTO } from '../../dtos/CreateCityDTO';
import { CitiesRepositoryInMemory } from '../../repositories/in-memory/CitiesRepositoryInMemory';
import { CreateCityUseCase } from './CreateCity.useCase';

describe('Create City Use Case', () => {
  let citiesRepositoryInMemory: CitiesRepositoryInMemory;
  let createCityUseCase: CreateCityUseCase;

  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(citiesRepositoryInMemory);
  });

  it('should be able to create a new city in a state', async () => {
    const cityToCreate: CreateCityDTO = {
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    };

    const city = await createCityUseCase.execute(cityToCreate);

    expect(city.id).not.toBeFalsy();
    expect(city.created_at).not.toBeFalsy();
    expect(city.version).toBe(0);
  });
});
