import { ResponseStatus } from './response-status';

export interface ResponseModelProps<T> {
  data?: T;
  code?: number;
  message?: string;
}

export class ResponseModel<T> {
  // status: ResponseStatus;
  statusCode: number;
  message: string;
  data: T;

  constructor({ data, code, message }: ResponseModelProps<T>) {
    this.statusCode = code;
    this.message = message;
    // this.status = new ResponseStatus(code || 200, message);
    this.data = data;
  }
}
