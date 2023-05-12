"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmbeddedSignatureRequestResponse = exports.ResponseValidationSchema = void 0;
const zod_1 = require("zod");
exports.ResponseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        signatureRequest: zod_1.z.object({
            signatureRequestId: zod_1.z.string(),
            signatures: zod_1.z
                .object({
                signatureId: zod_1.z.string(),
            })
                .array()
                .length(1),
        }),
    }),
});
const validateEmbeddedSignatureRequestResponse = (fields) => {
    const parsedData = exports.ResponseValidationSchema.parse(fields);
    return parsedData;
};
exports.validateEmbeddedSignatureRequestResponse = validateEmbeddedSignatureRequestResponse;
//# sourceMappingURL=embeddedSignatureRequestValidation.js.map