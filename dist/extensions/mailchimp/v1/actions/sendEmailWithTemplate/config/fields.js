"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
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
    templateName: {
        id: 'templateName',
        label: 'Template name',
        description: 'The immutable name or slug of a template that exists in your account.',
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
    templateContent: {
        id: 'templateContent',
        label: 'Template content',
        description: 'An array of template content to send. Each item in the array should be a struct with two keys - name: the name of the content block to set the content for, and content: the actual content to put into the block',
        type: types_1.FieldType.JSON,
        required: false,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    to: zod_1.z.string().email(),
    subject: zod_1.z.string(),
    templateName: zod_1.z.string(),
    templateContent: zod_1.z
        .optional(zod_1.z.string())
        .transform((str, ctx) => {
        if ((0, lodash_1.isNil)(str) || (0, lodash_1.isEmpty)(str))
            return [];
        try {
            const parsedJson = JSON.parse(str);
            if ((0, lodash_1.isEmpty)(parsedJson)) {
                return [];
            }
            if (!Array.isArray(parsedJson)) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'templateContent should be an array',
                });
                return zod_1.z.NEVER;
            }
            const allObjectsHaveKeys = parsedJson.every((obj) => {
                if (typeof obj !== 'object') {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Object entries in templateContent array should be an object',
                    });
                    return zod_1.z.NEVER;
                }
                return 'name' in obj && 'content' in obj;
            });
            if (!allObjectsHaveKeys) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Every object in the templateContent array should (only) have a `name` and `content` field',
                });
                return zod_1.z.NEVER;
            }
            return parsedJson;
        }
        catch (e) {
            ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
            return zod_1.z.NEVER;
        }
    }),
});
//# sourceMappingURL=fields.js.map