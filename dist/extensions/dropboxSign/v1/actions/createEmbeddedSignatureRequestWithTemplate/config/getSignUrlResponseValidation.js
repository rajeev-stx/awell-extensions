"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetSignUrlResponse = exports.ResponseValidationSchema = void 0;
const date_fns_1 = require("date-fns");
const zod_1 = require("zod");
exports.ResponseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        embedded: zod_1.z.object({
            signUrl: zod_1.z.string().url(),
            expiresAt: zod_1.z
                .number()
                .transform((unixTimestamp) => (0, date_fns_1.fromUnixTime)(unixTimestamp))
                .transform((date) => (0, date_fns_1.formatISO)(date)),
        }),
    }),
});
const validateGetSignUrlResponse = (fields) => {
    const parsedData = exports.ResponseValidationSchema.parse(fields);
    return parsedData;
};
exports.validateGetSignUrlResponse = validateGetSignUrlResponse;
//# sourceMappingURL=getSignUrlResponseValidation.js.map