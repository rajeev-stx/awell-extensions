"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeOptionalSchema = exports.DateOnlyOptionalSchema = exports.DateTimeSchema = exports.DateOnlySchema = void 0;
const zod_1 = require("zod");
const date_fns_1 = require("date-fns");
const generic_1 = require("../generic");
exports.DateOnlySchema = zod_1.z.coerce
    .date({
    errorMap: () => ({
        message: 'Requires date in valid format (YYYY-MM-DD)',
    }),
})
    .transform((arg) => (0, date_fns_1.formatISO)(arg, { representation: 'date' }));
exports.DateTimeSchema = zod_1.z.coerce
    .date({
    errorMap: () => ({
        message: 'Requires date in valid format (ISO8601)',
    }),
})
    .transform((arg) => (0, date_fns_1.formatISO)(arg));
exports.DateOnlyOptionalSchema = (0, generic_1.makeStringOptional)(exports.DateOnlySchema);
exports.DateTimeOptionalSchema = (0, generic_1.makeStringOptional)(exports.DateTimeSchema);
//# sourceMappingURL=DateSchema.js.map