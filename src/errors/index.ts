export class BadRequestExeption extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public date: Date = new Date(),
  ) {
    super(message)
    this.name = 'BadRequestError'
    this.statusCode = 400 // HTTP status code for bad request
    this.date = new Date() // Timestamp of when the error occurred
  }
}

export class NotFoundException extends Error {
  constructor(
    message: string,
    public statusCode: number = 404,
    public date: Date = new Date(),
  ) {
    super(message)
    this.name = 'BadRequestError'
    this.statusCode = 404 // HTTP status code for bad request
    this.date = new Date() // Timestamp of when the error occurred
  }
}

export class InternalServerErrorException extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public date: Date = new Date(),
  ) {
    super(message)
    this.name = 'BadRequestError'
    this.statusCode = 500 // HTTP status code for bad request
    this.date = new Date() // Timestamp of when the error occurred
  }
}
