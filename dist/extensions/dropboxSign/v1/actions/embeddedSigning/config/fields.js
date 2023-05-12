"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActionFields = exports.FieldsValidationSchema = exports.fields = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../../../../lib/types");
exports.fields = {
    signUrl: {
        id: 'signUrl',
        label: 'Sign URL',
        description: 'Enter the sign URL generated via the "Create embedded signature request with template" action',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    signUrl: zod_1.z.string().url(),
});
const validateActionFields = (fields) => {
    const parsedData = exports.FieldsValidationSchema.parse(fields);
    return parsedData;
};
exports.validateActionFields = validateActionFields;
//# sourceMappingURL=fields.js.map