import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCityUseCase } from './CreateCity.useCase';

export class CreateCityController {
  public static async handle(request: Request, response: Response) {
    const { name, state } = request.body;

    const createCityUseCase = container.resolve(CreateCityUseCase);

    const city = await createCityUseCase.execute({ name, state });

    return response.status(201).json(city);
  }
}
