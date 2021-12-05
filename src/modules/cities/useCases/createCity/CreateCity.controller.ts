import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';

import { AppError } from '../../../../shared/errors/AppError';
import { errorMessages } from '../../../../shared/errors/ErrorMessages';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { CreateCityUseCase } from './CreateCity.useCase';

export class CreateCityController {
  public static async handle(request: Request, response: Response) {
    const { name, state } = request.body;

    const createCityUseCase = container.resolve(CreateCityUseCase);

    try {
      const schema = yup.object().shape({
        name: yup
          .string()
          .required(errorMessages('name').required)
          .matches(/[A-Z]/g, 'Must be only letters'),
        state: yup
          .string()
          .required(errorMessages('state').required)
          .matches(/[A-Z]/g, 'Must be only letters'),
      });

      await schema.validate(request.body);
    } catch (error: any) {
      throw new AppError(error.message, HttpCodes.UNPROCESSABLE_ENTITY);
    }

    const city = await createCityUseCase.execute({ name, state });

    return response.status(HttpCodes.CREATED).json(city);
  }
}
