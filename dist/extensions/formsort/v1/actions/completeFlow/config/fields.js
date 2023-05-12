"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActionFields = exports.FieldsValidationSchema = exports.fields = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../../../../lib/types");
exports.fields = {
    clientLabel: {
        id: 'clientLabel',
        label: 'Client label',
        description: 'The name (id) of your client.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    flowLabel: {
        id: 'flowLabel',
        label: 'Flow label',
        description: 'The name of your flow',
        type: types_1.FieldType.STRING,
        required: true,
    },
    variantLabel: {
        id: 'variantLabel',
        label: 'Variant label',
        description: 'The name of the variant.',
        type: types_1.FieldType.STRING,
        required: false,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    clientLabel: zod_1.z.string(),
    flowLabel: zod_1.z.string(),
    variantLabel: zod_1.z.optional(zod_1.z.string()),
});
const validateActionFields = (fields) => {
    const parsedData = exports.FieldsValidationSchema.parse(fields);
    return parsedData;
};
exports.validateActionFields = validateActionFields;
//# sourceMappingURL=fields.js.map