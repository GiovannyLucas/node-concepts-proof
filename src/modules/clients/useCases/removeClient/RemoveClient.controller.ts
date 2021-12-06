import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { RemoveClientUseCase } from './RemoveClient.useCase';

export class RemoveClientController {
  public static async handle(request: Request, response: Response) {
    const { id } = request.params;

    const removeClientUseCase = container.resolve(RemoveClientUseCase);

    const clientIsDeleted = await removeClientUseCase.execute(id);

    return response.status(HttpCodes.OK).json({
      deleted: clientIsDeleted,
    });
  }
}
