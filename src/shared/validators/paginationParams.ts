export interface IValidPaginationParams {
  offset: number;
  limit: number;
}

export class PaginationParamsValidate {
  public static handle(
    limit?: number | string | undefined,
    page?: number | string | undefined,
  ): IValidPaginationParams {
    if (!limit && !page) {
      return {
        offset: 0,
        limit: 10,
      };
    }

    const TIMES_TO_SKIP_PAGINATION = 1;
    const amountValidated = !limit || +limit <= 0 ? 10 : +limit;
    const pageValidated =
      !page || +page <= 0 ? 1 : +page - TIMES_TO_SKIP_PAGINATION;

    return {
      offset: pageValidated * amountValidated,
      limit: amountValidated,
    };
  }
}
