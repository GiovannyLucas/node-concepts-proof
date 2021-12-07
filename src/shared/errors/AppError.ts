import { HttpCodes } from './HttpCodes';

export class AppError {
  public readonly description: string;
  public readonly statusCode: HttpCodes;

  constructor(
    description: string,
    statusCode: HttpCodes = HttpCodes.BAD_REQUEST,
  ) {
    this.description = description;
    this.statusCode = statusCode;
  }
}
