import { IValidPaginationParams } from '../../../shared/validators/paginationParams';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { Client } from '../infra/typeorm/entities/Client';

export interface IClientsRepository {
  create(clientToCreate: CreateClientDTO): Promise<Client>;
  find(
    pagination: IValidPaginationParams,
    filters: { name?: string },
  ): Promise<{ clients: Client[]; total: number }>;
  showById(id: string): Promise<Client | undefined>;
  update(id: string, clientsData: { name: string }): Promise<Client>;
  delete(id: string): Promise<boolean>;
}
