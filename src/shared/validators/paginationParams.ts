export class PaginationParamsValidate {
  public static handle(params: { amount: number, page: number }) {
    const amountValidated = !params.amount || params.amount <= 0 ? 10 : params.amount;
    const pageValidated = !params.page || params.page <= 0 ? 1 : params.amount;

    const TIMES_TO_SKIP_PAGINATION = 1;

    return {
      page: pageValidated - TIMES_TO_SKIP_PAGINATION,
      amount: amountValidated * pageValidated,
    }
  }
}