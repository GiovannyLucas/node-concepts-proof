import { ErrorCodesHttp } from './ErrorCodesHttp';

export class AppError {
  public readonly description: string;
  public readonly statusCode: ErrorCodesHttp;

  constructor(
    description: string,
    statusCode: ErrorCodesHttp = ErrorCodesHttp.BAD_REQUEST,
  ) {
    this.description = description;
    this.statusCode = statusCode;
  }
}
