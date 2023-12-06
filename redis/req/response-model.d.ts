import { ResponseStatus } from './response-status';
export declare class ResponseModel<T> {
    status: ResponseStatus;
    data: T;
    constructor(status: ResponseStatus, data: T);
}
