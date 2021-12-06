import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { ShowClientByIdUseCase } from './ShowClientById.useCase';

export class ShowClientByIdController {
  public static async handle(request: Request, response: Response) {
    const { id } = request.params;

    const showClientByIdUseCase = container.resolve(ShowClientByIdUseCase);

    const client = await showClientByIdUseCase.execute(id);

    return response.status(HttpCodes.OK).json(client);
  }
}
