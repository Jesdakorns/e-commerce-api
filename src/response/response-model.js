"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModel = void 0;
class ResponseModel {
    constructor({ data, code, message, paginate }) {
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
exports.ResponseModel = ResponseModel;
//# sourceMappingURL=response-model.js.map