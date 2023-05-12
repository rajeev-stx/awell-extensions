"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
const lodash_1 = require("lodash");
const zod_1 = require("zod");
const types_1 = require("../../../../../../lib/types");
const graphql_1 = require("../../../gql/graphql");
exports.fields = {
    pathwayStatus: {
        id: 'pathwayStatus',
        label: 'Pathway status',
        description: 'A comma-separated string of care flow statuses that will be used when looking for care flows the patient is already enrolled in. By default, we only look at active care flows. Options: "active" "completed", "missing_baseline_info", "starting", and "stopped".',
        type: types_1.FieldType.STRING,
        required: false,
    },
    careFlowDefinitionIds: {
        id: 'careFlowDefinitionIds',
        label: 'Care flow definition IDs',
        description: 'A comma-separated string of care flow definition ids that will be used when looking for care flows the patient is already enrolled in. By default, we only search for care flows that match the current care flow definition id (i.e. is the patient already included in the current care flow?).',
        type: types_1.FieldType.STRING,
        required: false,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    pathwayStatus: zod_1.z.optional(zod_1.z
        .string()
        .transform((chars) => chars.replace(/\s/g, '')) // Make sure all white spaces are stripped
        .transform((chars) => chars.split(','))
        .transform((strArray) => {
        const possibleStatuses = Object.values(graphql_1.PathwayStatus);
        return strArray.filter((str) => possibleStatuses.includes(str));
    })),
    careFlowDefinitionIds: zod_1.z.optional(zod_1.z
        .string()
        .transform((chars) => chars.replace(/\s/g, '')) // Make sure all white spaces are stripped
        .transform((chars) => chars.split(','))
        .transform((strArray) => strArray.filter((str) => !(0, lodash_1.isNil)(str) && !(0, lodash_1.isEmpty)(str)))),
});
//# sourceMappingURL=fields.js.map