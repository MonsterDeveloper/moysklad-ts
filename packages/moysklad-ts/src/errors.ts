export class MoyskladError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class MoyskladApiError extends MoyskladError {
  public code: number;
  public moreInfo: string;

  constructor(message: string, status: number, code: number, moreInfo: string) {
    super(message, status);
    this.status = status;
    this.code = code;
    this.moreInfo = moreInfo;
  }
}
