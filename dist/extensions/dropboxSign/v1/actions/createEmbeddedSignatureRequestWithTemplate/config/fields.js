"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActionFields = exports.FieldsValidationSchema = exports.fields = void 0;
const types_1 = require("../../../../../../lib/types");
const zod_1 = require("zod");
exports.fields = {
    signerRole: {
        id: 'signerRole',
        label: 'Signer role',
        description: "Must match an existing role in chosen template. It's case-sensitive.",
        type: types_1.FieldType.STRING,
        required: true,
    },
    signerName: {
        id: 'signerName',
        label: 'Signer name',
        description: 'The name of the signer.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    signerEmailAddress: {
        id: 'signerEmailAddress',
        label: 'Signer email address',
        description: 'The email address of the signer.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    templateId: {
        id: 'templateId',
        label: 'Template ID',
        description: 'Use the template id to create a SignatureRequest from a template.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    title: {
        id: 'title',
        label: 'Title',
        description: 'The title you want to assign to the SignatureRequest.',
        type: types_1.FieldType.STRING,
        required: false,
    },
    subject: {
        id: 'subject',
        label: 'Subject',
        description: 'The subject in the email that will be sent to the signer.',
        type: types_1.FieldType.STRING,
        required: false,
    },
    message: {
        id: 'message',
        label: 'Message',
        description: 'The custom message in the email that will be sent to the signer.',
        type: types_1.FieldType.STRING,
        required: false,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    signerRole: zod_1.z.string(),
    signerName: zod_1.z.string(),
    signerEmailAddress: zod_1.z.string().email(),
    templateId: zod_1.z.string(),
    title: zod_1.z.optional(zod_1.z.string()),
    subject: zod_1.z.optional(zod_1.z.string()),
    message: zod_1.z.optional(zod_1.z.string()),
});
const validateActionFields = (fields) => {
    const parsedData = exports.FieldsValidationSchema.parse(fields);
    return parsedData;
};
exports.validateActionFields = validateActionFields;
//# sourceMappingURL=fields.js.map