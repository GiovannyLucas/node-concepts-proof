import { getRepository, ILike, Repository } from 'typeorm';

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

  async find(
    { limit, offset }: IValidPaginationParams,
    { name }: { name?: string },
  ): Promise<{ clients: Client[]; total: number }> {
    const [clients, total] = await this.repository.findAndCount({
      relations: ['city'],
      where: {
        full_name: ILike(`%${name || ''}%`),
      },
      skip: offset,
      take: limit,
      order: {
        full_name: 'ASC',
      },
    });

    return { clients, total };
  }

  async showById(id: string): Promise<Client | undefined> {
    const client = await this.repository.findOne({ id });

    return client;
  }

  update(id: string): Promise<Client> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
