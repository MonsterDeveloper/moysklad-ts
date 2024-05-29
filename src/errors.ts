export class MoyskladError extends Error {
  public response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

export class MoyskladApiError extends MoyskladError {
  public code: number;
  public moreInfo: string;

  constructor(
    message: string,
    code: number,
    moreInfo: string,
    response: Response,
  ) {
    super(message, response);
    this.code = code;
    this.moreInfo = moreInfo;
  }
}
