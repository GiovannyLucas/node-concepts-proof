import { inject, injectable } from 'tsyringe';

import { IValidPaginationParams } from '../../../../shared/validators/paginationParams';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@injectable()
export class FindClientsUseCase {
  constructor(
    @inject('CLIENTS_REPOSITORY')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(
    pagination: IValidPaginationParams,
    filters: { name?: string },
  ) {
    const clients = await this.clientsRepository.find(pagination, filters);

    return clients;
  }
}
