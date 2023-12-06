export interface OptionPaginate {
    limit?: number;
    page?: number;
    orderBy?: 'ASC' | 'DESC';
    orderByField?: string;
}
export interface ResponseBuilderProps<T> {
    data?: T;
    code?: number;
    message?: string;
    paginate?: MetaProps;
}
export interface MetaProps {
    page: number;
    total: number;
    limit: number;
}
export interface ResponseMetaProps {
    page: number;
    limit: number;
    total: number;
    lastPage?: number;
    nextPage?: number;
    prevPage?: number;
}
export declare class ResponseModel<T> {
    statusCode: number;
    message: string;
    data: T;
    meta: ResponseMetaProps;
    constructor({ data, code, message, paginate }: ResponseBuilderProps<T>);
}
