import * as faker from 'faker';
import request from 'supertest';
import { Connection } from 'typeorm';

import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

describe('Find Clients Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able list the clients without filter params', async () => {
    const {
      body: { id: city_id },
    } = await request(app).post('/api/v1/cities').send({
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    });

    await request(app)
      .post('/api/v1/clients')
      .send({
        full_name: 'Francisco José',
        gender: 'F',
        born_date: new Date(2000, 1, 1),
        city_living_id: city_id,
      });

    await request(app)
      .post('/api/v1/clients')
      .send({
        full_name: 'José Francisco',
        gender: 'M',
        born_date: new Date(2000, 1, 1),
        city_living_id: city_id,
      });

    const response = await request(app)
      .get('/api/v1/clients')
      .query({ limit: 10, page: 1 });

    expect(response.status).toBe(HttpCodes.OK);
    expect(response.body.total).toBe(2);
  });

  it('should be able list the clients passing a name', async () => {
    const {
      body: { id: city_id },
    } = await request(app).post('/api/v1/cities').send({
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    });

    const nameToFilter = 'José';

    await request(app)
      .post('/api/v1/clients')
      .send({
        full_name: 'José Francisco',
        gender: 'M',
        born_date: new Date(2000, 1, 1),
        city_living_id: city_id,
      });

    await request(app)
      .post('/api/v1/clients')
      .send({
        full_name: 'Francisco José',
        gender: 'M',
        born_date: new Date(2000, 1, 1),
        city_living_id: city_id,
      });

    await request(app)
      .post('/api/v1/clients')
      .send({
        full_name: 'Chico Zé',
        gender: 'M',
        born_date: new Date(2000, 1, 1),
        city_living_id: city_id,
      });

    const response = await request(app)
      .get('/api/v1/clients')
      .query({ limit: 10, page: 1, name: nameToFilter });

    expect(response.status).toBe(HttpCodes.OK);
    expect(response.body.total).toBe(2);
    expect(response.body.clients.length).toBe(2);
    expect(response.body.clients[0].full_name).toContain(nameToFilter);
  });
});
