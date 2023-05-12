"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringDate = void 0;
const zod_1 = require("zod");
const date_fns_1 = require("date-fns");
exports.stringDate = zod_1.z.coerce
    .date({
    errorMap: () => ({
        message: 'Requires date in valid format (YYYY-MM-DD)',
    }),
})
    .transform((arg) => (0, date_fns_1.formatISO)(arg, { representation: 'date' }));
//# sourceMappingURL=generic.zod.js.map