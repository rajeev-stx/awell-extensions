"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringIsoDate = exports.stringDate = exports.numberId = void 0;
const zod_1 = require("zod");
const date_fns_1 = require("date-fns");
/**
 * numberId is a REQUIRED field, so please use a z.coerce...optional() for non-
 * required numbers
 */
exports.numberId = zod_1.z.coerce
    .number({
    invalid_type_error: 'Requires a valid ID (number)',
})
    .positive({
    message: 'Requires a valid ID (number)',
});
exports.stringDate = zod_1.z.coerce
    .date({
    errorMap: () => ({
        message: 'Requires date in valid format (YYYY-MM-DD)',
    }),
})
    .transform((arg) => (0, date_fns_1.formatISO)(arg, { representation: 'date' }));
exports.stringIsoDate = zod_1.z.coerce
    .date({
    errorMap: () => ({
        message: 'Requires date in valid format (ISO8601)',
    }),
})
    .transform((arg) => (0, date_fns_1.formatISO)(arg));
//# sourceMappingURL=generic.zod.js.map