import { AppError } from '../../../../shared/errors/AppError';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
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

  it('should not be able to create two cities with the same name in a state', async () => {
    const cityToCreate: CreateCityDTO = {
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    };
    const sameCity = { ...cityToCreate };

    await citiesRepositoryInMemory.create(cityToCreate);

    const createSameCity = createCityUseCase.execute(sameCity);

    await expect(createSameCity).rejects.toBeInstanceOf(AppError);
    await expect(createSameCity).rejects.toEqual(
      new AppError(
        'This city already exists in the state.',
        HttpCodes.CONFLICT,
      ),
    );
  });

  it('should not be able to create a new city by some internal problem', async () => {
    const wrongWayToCreateCity = {};

    const tryCreateWrongCity = createCityUseCase.execute(
      wrongWayToCreateCity as CreateCityDTO,
    );

    await expect(tryCreateWrongCity).rejects.toBeInstanceOf(AppError);
    await expect(tryCreateWrongCity).rejects.toEqual(
      new AppError('Error to create the city', HttpCodes.INTERNAL_SERVER),
    );
  });
});
