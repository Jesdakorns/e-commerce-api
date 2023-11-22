export interface ResponseModelProps<T> {
    data?: T;
    code?: number;
    message?: string;
}
export declare class ResponseModel<T> {
    statusCode: number;
    message: string;
    data: T;
    constructor({ data, code, message }: ResponseModelProps<T>);
}
