import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { PaginationParamsValidate } from '../../../../shared/validators/paginationParams';
import { FindClientsUseCase } from './FindClients.useCase';

export class FindClientsController {
  public static async handle(request: Request, response: Response) {
    const { name, limit: limitReceived, page } = request.query;

    const pagination = PaginationParamsValidate.handle(
      limitReceived as string | undefined,
      page as string | undefined,
    );

    const findClientsUseCase = container.resolve(FindClientsUseCase);

    let filter: any = {
      name,
    };

    if (!name) {
      filter = {};
    }

    const clients = await findClientsUseCase.execute(pagination, filter);

    return response.status(HttpCodes.OK).json(clients);
  }
}
