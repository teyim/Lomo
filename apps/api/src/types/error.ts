import { HttpStatusCode } from "../constants";

export class ErrorWithStatus extends Error {
  public status: HttpStatusCode;

  constructor(message: string, status: HttpStatusCode = HttpStatusCode.InternalServerError) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}