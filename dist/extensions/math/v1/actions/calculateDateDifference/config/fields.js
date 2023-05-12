"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../../../../lib/types");
exports.fields = {
    dateLeft: {
        id: 'dateLeft',
        label: 'Date left (minuend)',
        description: 'The date from which the other date (date right) is to be subtracted.',
        required: true,
        type: types_1.FieldType.DATE,
    },
    dateRight: {
        id: 'dateRight',
        label: 'Date right (subtrahend)',
        description: 'The date to be subtracted from the other date (date left).',
        required: true,
        type: types_1.FieldType.DATE,
    },
    unit: {
        id: 'unit',
        label: 'The unit you would like to calculate the difference in',
        description: 'Choose one of "seconds", "minutes", "hours", "days", "weeks", "months", "years".',
        required: true,
        type: types_1.FieldType.STRING,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    dateLeft: zod_1.z.coerce.date(),
    dateRight: zod_1.z.coerce.date(),
    unit: zod_1.z.enum([
        'seconds',
        'minutes',
        'hours',
        'days',
        'weeks',
        'months',
        'years',
    ]),
});
//# sourceMappingURL=fields.js.map