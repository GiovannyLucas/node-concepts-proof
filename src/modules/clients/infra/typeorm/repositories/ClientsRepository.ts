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

  async find(
    { limit, offset }: IValidPaginationParams,
    { name }: { name?: string },
  ): Promise<{ clients: Client[]; total: number }> {
    const nameCaseWhere = `CASE
      WHEN (:name = '%%') THEN TRUE
      ELSE full_name ILIKE :name
    END`;

    const [clients, total] = await this.repository
      .createQueryBuilder('clients')
      .leftJoinAndSelect('clients.city', 'city')
      .where(nameCaseWhere, { name: `%${name || ''}%` })
      .skip(offset)
      .take(limit)
      .orderBy({ full_name: 'ASC' })
      .getManyAndCount();

    return { clients, total };
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
