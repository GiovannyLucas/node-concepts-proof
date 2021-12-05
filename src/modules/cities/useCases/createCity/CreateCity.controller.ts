import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCityUseCase } from './CreateCity.useCase';

export class CreateCityController {
  public static async handle(request: Request, response: Response) {
    const { name, state } = request.body;

    const createCityUseCase = container.resolve(CreateCityUseCase);

    // TODO: finalizar implantação do AppError
    // TODO: adicionar validação do YUP
    // TODO: atualizar requisitos no README

    const city = await createCityUseCase.execute({ name, state });

    return response.status(201).json(city);
  }
}
