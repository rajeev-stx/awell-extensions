"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
const types_1 = require("../../../../../../lib/types");
const zod_1 = require("zod");
const lodash_1 = require("lodash");
exports.fields = {
    pathwayDefinitionId: {
        id: 'pathwayDefinitionId',
        label: 'Care flow definition ID',
        description: 'The identifier of the care flow definition to start.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    baselineInfo: {
        id: 'baselineInfo',
        label: 'Baseline info',
        description: 'Use baseline info to pass values for data points when starting a care flow. This needs to be an array of objects, please read the documentation for more info.',
        type: types_1.FieldType.JSON,
        required: false,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    pathwayDefinitionId: zod_1.z.string(),
    baselineInfo: zod_1.z
        .optional(zod_1.z.string())
        .transform((str, ctx) => {
        if ((0, lodash_1.isNil)(str) || (0, lodash_1.isEmpty)(str))
            return undefined;
        try {
            const parsedJson = JSON.parse(str);
            if ((0, lodash_1.isEmpty)(parsedJson)) {
                return undefined;
            }
            if (!Array.isArray(parsedJson)) {
                ctx.addIssue({
                    code: 'custom',
                    message: `Baseline info should be an array, it's currently a ${typeof parsedJson}.`,
                });
                return zod_1.z.NEVER;
            }
            const allObjectsHaveKeys = parsedJson.every((obj) => {
                if (typeof obj !== 'object') {
                    ctx.addIssue({
                        code: 'custom',
                        message: `Item "${String(obj)}" in baseline info array is not an object.`,
                    });
                    return zod_1.z.NEVER;
                }
                return 'data_point_definition_id' in obj && 'value' in obj;
            });
            const allObjectValuesAreStrings = parsedJson.every((obj) => {
                return Object.values(obj).every((v) => typeof v === 'string');
            });
            if (!allObjectsHaveKeys) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Every object in the baseline info array should (only) have a `data_point_definition_id` and `value` field.',
                });
                return zod_1.z.NEVER;
            }
            if (!allObjectValuesAreStrings) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Not all baseline info values are strings. Given data point values are polymorphic, the value for a data point should always be sent as a string.',
                });
                return zod_1.z.NEVER;
            }
            return parsedJson;
        }
        catch (e) {
            ctx.addIssue({ code: 'custom', message: 'Invalid JSON.' });
            return zod_1.z.NEVER;
        }
    }),
});
//# sourceMappingURL=fields.js.map