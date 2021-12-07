import * as faker from 'faker';
import request from 'supertest';
import { Connection } from 'typeorm';

import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';
import { CreateCityDTO } from '../../dtos/CreateCityDTO';

describe('Create City Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new city in a state', async () => {
    const cityToCreate: CreateCityDTO = {
      name: faker.address.cityName(),
      state: faker.address.state(),
    };

    const response = await request(app)
      .post('/api/v1/cities')
      .send(cityToCreate);

    expect(response.status).toBe(HttpCodes.CREATED);
  });

  it('should not be able to create two cities with the same name in a state', async () => {
    const cityToCreate: CreateCityDTO = {
      name: faker.address.cityName(),
      state: faker.address.state(),
    };
    const sameCity = { ...cityToCreate };

    await request(app).post('/api/v1/cities').send(cityToCreate);

    const response = await request(app).post('/api/v1/cities').send(sameCity);

    expect(response.status).toBe(HttpCodes.CONFLICT);
  });

  it('should not be able to create passing a wrong param type', async () => {
    const cityToCreate = {
      name: faker.address.cityName(),
    };

    const response = await request(app)
      .post('/api/v1/cities')
      .send(cityToCreate);

    expect(response.status).toBe(HttpCodes.UNPROCESSABLE_ENTITY);
  });
});
