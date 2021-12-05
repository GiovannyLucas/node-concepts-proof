import * as faker from 'faker';
import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';
import { CreateCityDTO } from '../../dtos/CreateCityDTO';

// const ormOptions = require('../../../../../ormconfig');

describe('Create City Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  // afterAll(async () => {
  //   await connection.dropDatabase();
  //   await connection.close();
  // });

  it('should be able to create a new city in a state', async () => {
    const cityToCreate: CreateCityDTO = {
      name: faker.address.cityName(),
      state: faker.address.state(),
    };

    const response = await request(app)
      .post('/api/v1/cities')
      .send(cityToCreate);

    expect(response.status).toBe(201);
  });
});
