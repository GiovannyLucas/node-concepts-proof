import { v4 as uuid } from 'uuid';

import { IValidPaginationParams } from '../../../../shared/validators/paginationParams';
import { CreateClientDto } from '../../dtos/CreateClientDTO';
import { Client } from '../../infra/typeorm/entities/Client';
import { IClientsRepository } from '../IClientsRepository';

export class ClientsRepositoryInMemory implements IClientsRepository {
  clients: Client[] = [];

  async create(clientToCreate: CreateClientDto): Promise<Client> {
    const { full_name, gender, born_date, age, city_living_id } =
      clientToCreate;

    if (!full_name || !gender || !born_date || !age) return {} as Client;

    const client = new Client();
    client.id = uuid();
    client.full_name = full_name;
    client.gender = gender;
    client.born_date = born_date;
    client.age = age;
    client.city_living_id = city_living_id;
    client.created_at = new Date();
    client.version = 0;

    this.clients.push(client);

    return client;
  }

  find(
    pagination: IValidPaginationParams,
    filters?: { name?: string | undefined },
  ): Promise<{ clients: Client[]; total: number }> {
    throw new Error('Method not implemented.');
  }

  showById(id: string): Promise<Client | undefined> {
    throw new Error('Method not implemented.');
  }

  update(id: string): Promise<Client> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
