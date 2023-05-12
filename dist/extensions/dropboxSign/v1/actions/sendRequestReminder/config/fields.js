"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActionFields = exports.FieldsValidationSchema = exports.fields = void 0;
const types_1 = require("../../../../../../lib/types");
const zod_1 = require("zod");
exports.fields = {
    signatureRequestId: {
        id: 'signatureRequestId',
        label: 'Signature request ID',
        description: 'The id of the SignatureRequest to send a reminder for.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    signerEmailAddress: {
        id: 'signerEmailAddress',
        label: 'Signer email address',
        description: 'The email address of the signer to send a reminder to.',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    signatureRequestId: zod_1.z.string(),
    signerEmailAddress: zod_1.z.string().email(),
});
const validateActionFields = (fields) => {
    const parsedData = exports.FieldsValidationSchema.parse(fields);
    return parsedData;
};
exports.validateActionFields = validateActionFields;
//# sourceMappingURL=fields.js.map