export class MoyskladError extends Error {
  public response: Response

  constructor(message: string, response: Response) {
    super(message)
    this.response = response
    this.name = this.constructor.name
  }
}

export class MoyskladApiError extends MoyskladError {
  public code?: number
  public moreInfo?: string

  constructor(
    message: string,
    response: Response,
    code?: number,
    moreInfo?: string,
  ) {
    super(message, response)
    this.code = code
    this.moreInfo = moreInfo
  }
}
