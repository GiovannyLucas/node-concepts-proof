import * as faker from 'faker';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';
import { CreateCityDTO } from '../../../cities/dtos/CreateCityDTO';
import { CreateClientDTO } from '../../dtos/CreateClientDTO';

describe('Create Client Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM public.clients');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should be able to create a new client', async () => {
    const cityToCreate: CreateCityDTO = {
      name: faker.address.cityName(),
      state: faker.address.state(),
    };

    const {
      body: { id: city_id },
    } = await request(app).post('/api/v1/cities').send(cityToCreate);

    const clientToCreate: CreateClientDTO = {
      full_name: faker.name.findName(),
      gender: 'F',
      born_date: new Date(2000, 1, 1),
      city_living_id: city_id,
    };

    const response = await request(app)
      .post('/api/v1/clients')
      .send(clientToCreate);

    expect(response.status).toBe(HttpCodes.CREATED);
  });

  it('should not be able create new client if the city dont exists', async () => {
    const randomCityId = uuid();

    const clientToCreate: CreateClientDTO = {
      full_name: faker.name.findName(),
      gender: 'F',
      born_date: new Date(2000, 1, 1),
      city_living_id: randomCityId,
    };

    const response = await request(app)
      .post('/api/v1/clients')
      .send(clientToCreate);

    expect(response.status).toBe(HttpCodes.NOT_FOUND);
  });

  it('should not be able to create if passes a wrong param type', async () => {
    const cityToCreate: CreateCityDTO = {
      name: faker.address.cityName(),
      state: faker.address.state(),
    };

    const {
      body: { id: city_id },
    } = await request(app).post('/api/v1/cities').send(cityToCreate);

    const ANOTHER_TYPE = 'Female';

    const clientToCreate = {
      full_name: faker.name.findName(),
      gender: ANOTHER_TYPE,
      born_date: new Date(2000, 1, 1),
      city_living_id: city_id,
    };

    const response = await request(app)
      .post('/api/v1/clients')
      .send(clientToCreate);

    expect(response.status).toBe(HttpCodes.UNPROCESSABLE_ENTITY);
  });
});
