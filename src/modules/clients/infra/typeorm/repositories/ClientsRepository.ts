import { getRepository, Repository } from 'typeorm';

import { IValidPaginationParams } from '../../../../../shared/validators/paginationParams';
import { CreateClientDTO } from '../../../dtos/CreateClientDTO';
import { IClientsRepository } from '../../../repositories/IClientsRepository';
import { Client } from '../entities/Client';

export class ClientsRepository implements IClientsRepository {
  private readonly repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  async create(clientToCreate: CreateClientDTO): Promise<Client> {
    const { full_name, gender, born_date, age, city_living_id } =
      clientToCreate;

    const client = this.repository.create({
      full_name,
      gender,
      born_date,
      age,
      city_living_id,
    });

    await this.repository.save(client);

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
