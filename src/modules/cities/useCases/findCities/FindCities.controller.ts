import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { PaginationParamsValidate } from '../../../../shared/validators/paginationParams';
import { FindCitiesUseCase } from './FindCities.useCase';

export class FindCitiesController {
  public static async handle(request: Request, response: Response) {
    const { name, state, limit: limitReceived, page } = request.query;

    const pagination = PaginationParamsValidate.handle(
      limitReceived as string | undefined,
      page as string | undefined,
    );

    const findCitiesUseCase = container.resolve(FindCitiesUseCase);

    let filter: any = {
      name,
      state,
    };

    if (!name && !state) {
      filter = {};
    }

    const cities = await findCitiesUseCase.execute(pagination, filter);

    return response.status(HttpCodes.OK).json(cities);
  }
}
