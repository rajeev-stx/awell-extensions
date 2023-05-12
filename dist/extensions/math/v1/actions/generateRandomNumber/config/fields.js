"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../../../../lib/types");
exports.fields = {
    min: {
        id: 'min',
        label: 'Minimum number',
        description: 'The minimum number in the range (INCLUSIVE). Should be an integer.',
        required: true,
        type: types_1.FieldType.NUMERIC,
    },
    max: {
        id: 'max',
        label: 'Maximum number',
        description: 'The maximum end of the range (INCLUSIVE). Should be an integer.',
        required: true,
        type: types_1.FieldType.NUMERIC,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    min: zod_1.z.coerce.number().int(),
    max: zod_1.z.coerce.number().int(),
});
//# sourceMappingURL=fields.js.map