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

export class ResponseModel<T> {
  statusCode: number;
  message: string;
  data: T;
  meta: ResponseMetaProps;

  constructor({ data, code, message, paginate }: ResponseBuilderProps<T>) {
    const convertPage = +paginate?.page ?? 0;
    const lastPage = Math.ceil((paginate?.total ?? 0) / (paginate?.limit ?? 0));
    const nextPage = convertPage + 1 > lastPage ? null : convertPage + 1;
    const prevPage = convertPage - 1 < 1 ? null : convertPage - 1;

    this.statusCode = code;
    this.message = message;
    this.data = data;
    this.meta = paginate
      ? {
          page: convertPage,
          limit: +paginate?.limit ?? null,
          total: paginate?.total ?? null,
          lastPage,
          nextPage,
          prevPage,
        }
      : undefined;
  }
}
