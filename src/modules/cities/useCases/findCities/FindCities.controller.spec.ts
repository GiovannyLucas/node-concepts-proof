import request from 'supertest';
import { Connection } from 'typeorm';

import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { app } from '../../../../shared/infra/http/app';
import createConnection from '../../../../shared/infra/typeorm';

describe('Find Cites Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able list the cities without filter params', async () => {
    await request(app).post('/api/v1/cities').send({
      name: 'São Miguel',
      state: 'Rio Grande do Norte',
    });

    await request(app).post('/api/v1/cities').send({
      name: 'Gramado',
      state: 'Rio Grande do Sul',
    });

    const response = await request(app)
      .get('/api/v1/cities')
      .query({ limit: 10, page: 1 });

    expect(response.status).toBe(HttpCodes.OK);
    expect(response.body.total).toBe(2);
  });

  it('should be able list the cities in a state', async () => {
    const stateToFilter = 'Rio Grande do Norte';

    await request(app).post('/api/v1/cities').send({
      name: 'São Miguel',
      state: stateToFilter,
    });

    await request(app).post('/api/v1/cities').send({
      name: 'Gramado',
      state: 'Rio Grande do Sul',
    });

    const response = await request(app)
      .get('/api/v1/cities')
      .query({ limit: 10, page: 1, state: stateToFilter });

    expect(response.status).toBe(HttpCodes.OK);
    expect(response.body.total).toBe(1);
    expect(response.body.cities.length).toBe(1);
    expect(response.body.cities[0].state).toBe(stateToFilter);
  });

  it('should be able list the cities passing a name', async () => {
    const cityToFilter = 'Santa Inês';

    await request(app).post('/api/v1/cities').send({
      name: cityToFilter,
      state: 'Bahia',
    });

    await request(app).post('/api/v1/cities').send({
      name: cityToFilter,
      state: 'Paraná',
    });

    await request(app).post('/api/v1/cities').send({
      name: 'Curitiba',
      state: 'Paraná',
    });

    const response = await request(app)
      .get('/api/v1/cities')
      .query({ limit: 10, page: 1, name: cityToFilter });

    expect(response.status).toBe(HttpCodes.OK);
    expect(response.body.total).toBe(2);
    expect(response.body.cities.length).toBe(2);
    expect(response.body.cities[0].name).toBe(cityToFilter);
  });

  it('should be able show a city passing the state and name', async () => {
    const stateToFilter = 'Rio Grande do Norte';
    const cityToFilter = 'São Miguel';

    await request(app).post('/api/v1/cities').send({
      name: cityToFilter,
      state: stateToFilter,
    });

    await request(app).post('/api/v1/cities').send({
      name: 'Gramado',
      state: 'Rio Grande do Sul',
    });

    const response = await request(app)
      .get('/api/v1/cities')
      .query({ limit: 10, page: 1, state: stateToFilter, name: cityToFilter });

    expect(response.status).toBe(HttpCodes.OK);
    expect(response.body.total).toBe(1);
    expect(response.body.cities.length).toBe(1);
    expect(response.body.cities[0].state).toBe(stateToFilter);
    expect(response.body.cities[0].name).toBe(cityToFilter);
  });
});
