"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
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
    subject: {
        id: 'subject',
        label: 'Subject',
        description: 'The subject of your email.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    body: {
        id: 'body',
        label: 'Body',
        description: 'The content of your message.',
        type: types_1.FieldType.HTML,
        required: true,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    to: zod_1.z.string().email(),
    subject: zod_1.z.string(),
    body: zod_1.z.string(),
});
//# sourceMappingURL=fields.js.map