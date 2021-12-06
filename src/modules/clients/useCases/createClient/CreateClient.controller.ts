import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';

import { AppError } from '../../../../shared/errors/AppError';
import { errorMessages } from '../../../../shared/errors/ErrorMessages';
import { HttpCodes } from '../../../../shared/errors/HttpCodes';
import { CreateClientUseCase } from './CreateClient.useCase';

export class CreateClientController {
  public static async handle(request: Request, response: Response) {
    const { full_name, gender, born_date, city_living_id } = request.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);

    try {
      const schema = yup.object().shape({
        full_name: yup
          .string()
          .required(errorMessages('full_name').required)
          .matches(/[A-Z]/g, 'Must be only letters'),
        gender: yup
          .string()
          .equals(['M', 'F'])
          .required(errorMessages('gender').required),
        born_date: yup
          .date()
          .transform((_, originalValue) => {
            const parsedDate = new Date(
              dayjs(originalValue).format('YYYY-MM-DD'),
            );

            return parsedDate;
          })
          .max(new Date())
          .required(errorMessages('born_date').required),
        city_living_id: yup
          .string()
          .uuid(errorMessages('city_living_id').type('uuid')),
      });

      await schema.validate(request.body);
    } catch (error: any) {
      throw new AppError(error.message, HttpCodes.UNPROCESSABLE_ENTITY);
    }

    const age = dayjs().diff(born_date, 'years');

    const client = await createClientUseCase.execute({
      full_name,
      gender,
      born_date,
      age,
      city_living_id,
    });

    return response.status(HttpCodes.CREATED).json(client);
  }
}
