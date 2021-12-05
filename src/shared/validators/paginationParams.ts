export interface IValidPaginationParams {
  offset: number;
  limit: number;
}

export class PaginationParamsValidate {
  public static handle(
    params: { amount: number; page: number } | undefined,
  ): IValidPaginationParams {
    if (!params) {
      return {
        offset: 0,
        limit: 10,
      };
    }

    const amountValidated =
      !params.amount || params.amount <= 0 ? 10 : params.amount;
    const pageValidated = !params.page || params.page <= 0 ? 1 : params.amount;

    const TIMES_TO_SKIP_PAGINATION = 1;

    return {
      offset: (pageValidated - TIMES_TO_SKIP_PAGINATION) * amountValidated,
      limit: amountValidated,
    };
  }
}
