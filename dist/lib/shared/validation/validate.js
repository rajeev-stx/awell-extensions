"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function validate({ schema, payload, }) {
    const parsedData = schema.parse(payload);
    return parsedData;
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map