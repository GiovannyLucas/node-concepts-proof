import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@injectable()
export class RemoveClientUseCase {
  constructor(
    @inject('CLIENTS_REPOSITORY')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(id: string) {
    const client = await this.clientsRepository.showById(id);

    if (!client) {
      throw new AppError('Client not found.', HttpCodes.NOT_FOUND);
    }

    const clientHasBeenDeleted = await this.clientsRepository.delete(id);

    return clientHasBeenDeleted;
  }
}
