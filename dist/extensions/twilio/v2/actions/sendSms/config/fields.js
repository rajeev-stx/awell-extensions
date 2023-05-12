"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
const zod_1 = require("zod");
const validation_1 = require("../../../../../../lib/shared/validation");
const types_1 = require("../../../../../../lib/types");
const validation_2 = require("../../../../common/validation");
exports.fields = {
    recipient: {
        id: 'recipient',
        label: '"To" phone number',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.PHONE,
        description: 'The phone number you would like to send the text message to.',
        required: true,
    },
    message: {
        id: 'message',
        label: 'Message',
        description: 'The message you would like to send.',
        type: types_1.FieldType.TEXT,
        required: true,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    recipient: validation_1.E164PhoneValidationSchema,
    message: validation_2.MessageValidationSchema,
});
//# sourceMappingURL=fields.js.map