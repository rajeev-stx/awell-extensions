"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
const types_1 = require("../../../../../../lib/types");
const zod_1 = require("zod");
exports.fields = {
    reason: {
        id: 'reason',
        label: 'Reason',
        description: 'The reason why you want to stop the care flow.',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    reason: zod_1.z.string(),
});
//# sourceMappingURL=fields.js.map