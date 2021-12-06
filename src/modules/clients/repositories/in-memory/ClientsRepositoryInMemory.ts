import { v4 as uuid } from 'uuid';

import { IValidPaginationParams } from '../../../../shared/validators/paginationParams';
import { CreateClientDTO } from '../../dtos/CreateClientDTO';
import { Client } from '../../infra/typeorm/entities/Client';
import { IClientsRepository } from '../IClientsRepository';

export class ClientsRepositoryInMemory implements IClientsRepository {
  clients: Client[] = [];

  async create(clientToCreate: CreateClientDTO): Promise<Client> {
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

  async find(
    { limit, offset }: IValidPaginationParams,
    { name }: { name?: string },
  ): Promise<{ clients: Client[]; total: number }> {
    const clientsFiltered: Client[] = this.clients.filter((client) =>
      client.full_name.includes(name || ''),
    );

    const clients = clientsFiltered.slice(offset, limit);

    return { clients, total: clientsFiltered.length };
  }

  async showById(id: string): Promise<Client | undefined> {
    const client = this.clients.find((client) => client.id === id);

    return client;
  }

  update(id: string): Promise<Client> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
