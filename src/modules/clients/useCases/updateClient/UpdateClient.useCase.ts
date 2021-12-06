import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@injectable()
export class UpdateClientUseCase {
  constructor(
    @inject('CLIENTS_REPOSITORY')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(id: string, clientsData: { name: string }) {
    const client = await this.clientsRepository.showById(id);

    if (!client) {
      throw new AppError('Client not found.', HttpCodes.NOT_FOUND);
    }

    const updatedClient = await this.clientsRepository.update(id, clientsData);

    return updatedClient;
  }
}
