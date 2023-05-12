"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActionFields = exports.FieldsValidationSchema = exports.fields = void 0;
const lodash_1 = require("lodash");
const zod_1 = require("zod");
const types_1 = require("../../../../../../lib/types");
exports.fields = {
    to: {
        id: 'to',
        label: 'To',
        description: 'The email address of the recipient.',
        type: types_1.FieldType.STRING,
        /**
         * I am purposely not using the `email` stringType yet.
         * More information here: https://awellhealth.atlassian.net/jira/polaris/projects/AH/ideas/view/548618?selectedIssue=AH-176&issueViewLayout=sidebar&issueViewSection=capture&focusedInsightId=3144292
         */
        // stringType: StringType.EMAIL,
        required: true,
    },
    template: {
        id: 'template',
        label: 'Template',
        description: 'The name of the template you created in the Mailgun web portal.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    subject: {
        id: 'subject',
        label: 'Subject',
        description: 'The subject of your email.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    variables: {
        id: 'variables',
        label: 'Variables',
        description: 'Pass values for variables you defined in your template.',
        type: types_1.FieldType.JSON,
        required: false,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    to: zod_1.z.string().email(),
    subject: zod_1.z.string(),
    template: zod_1.z.string(),
    variables: zod_1.z
        .optional(zod_1.z.string())
        .transform((str, ctx) => {
        if ((0, lodash_1.isNil)(str))
            return {};
        try {
            return JSON.parse(str);
        }
        catch (e) {
            ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
            return zod_1.z.NEVER;
        }
    }),
});
const validateActionFields = (fields) => {
    const parsedData = exports.FieldsValidationSchema.parse(fields);
    return parsedData;
};
exports.validateActionFields = validateActionFields;
//# sourceMappingURL=fields.js.map