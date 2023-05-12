"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActionFields = exports.FieldsValidationSchema = exports.fields = void 0;
const types_1 = require("../../../../../../lib/types");
const zod_1 = require("zod");
exports.fields = {
    signatureRequestId: {
        id: 'signatureRequestId',
        label: 'Signature request ID',
        description: 'The id of the SignatureRequest to cancel. Please note you can only cancel incomplete signature requests.',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    signatureRequestId: zod_1.z.string(),
});
const validateActionFields = (fields) => {
    const parsedData = exports.FieldsValidationSchema.parse(fields);
    return parsedData;
};
exports.validateActionFields = validateActionFields;
//# sourceMappingURL=fields.js.map