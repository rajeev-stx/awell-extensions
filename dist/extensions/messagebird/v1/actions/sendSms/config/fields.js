"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
const types_1 = require("../../../../../../lib/types");
exports.fields = {
    originator: {
        id: 'originator',
        label: 'Originator',
        description: 'The sender of the message. This can be a telephone number (including country code) or an alphanumeric string.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    recipient: {
        id: 'recipient',
        label: 'Recipient',
        description: 'The mobile number of the recipient.',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.PHONE,
        required: true,
    },
    body: {
        id: 'body',
        label: 'Body',
        description: 'The content of your message.',
        type: types_1.FieldType.TEXT,
        required: true,
    },
};
//# sourceMappingURL=fields.js.map