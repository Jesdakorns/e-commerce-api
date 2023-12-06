"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSkipPaginate = void 0;
function convertSkipPaginate({ limit, page }) {
    const skip = (+page - 1) * limit;
    return skip;
}
exports.convertSkipPaginate = convertSkipPaginate;
//# sourceMappingURL=pagination.js.map