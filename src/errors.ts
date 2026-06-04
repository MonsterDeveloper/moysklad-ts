/** Сериализуемая информация о запросе */
interface CapturedRequest {
  url: string
  method: string
  /** Заголовки запроса (без Authorization) */
  headers: Record<string, string>
}

/** Сериализуемая информация об ответе */
interface CapturedResponse {
  status: number
  statusText: string
  body: string
}

export class MoyskladError extends Error {
  public requestInfo: CapturedRequest
  public responseInfo: CapturedResponse
  public response: Response
  public request: Request

  constructor(message: string, response: Response, request: Request) {
    const method = request.method
    const pathname = new URL(request.url).pathname
    const status = response.status
    super(`${method} ${pathname} → ${status}: ${message}`)

    this.requestInfo = {
      url: request.url,
      method,
      headers: Object.fromEntries(
        [...request.headers].filter(([k]) => k !== "authorization"),
      ),
    }
    this.responseInfo = {
      status,
      statusText: response.statusText,
      body: message,
    }

    this.response = response
    this.request = request
    this.name = this.constructor.name
  }

  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      requestInfo: this.requestInfo,
      responseInfo: this.responseInfo,
    }
  }
}

export class MoyskladApiError extends MoyskladError {
  public code?: number
  public moreInfo?: string

  constructor(
    message: string,
    response: Response,
    request: Request,
    code?: number,
    moreInfo?: string,
  ) {
    super(message, response, request)
    this.code = code
    this.moreInfo = moreInfo
  }

  toJSON(): object {
    return {
      ...super.toJSON(),
      code: this.code,
      moreInfo: this.moreInfo,
    }
  }
}
