"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fields = void 0;
const types_1 = require("../../../../../../lib/types");
exports.fields = {
    from: {
        id: 'from',
        label: 'From',
        description: 'The channel ID from which the message should be sent.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    to: {
        id: 'to',
        label: 'To',
        description: 'Either a channel-specific identifier for the receiver (e.g. MSISDN for SMS or WhatsApp channels), or the ID of a MessageBird Contact.',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.PHONE,
        required: true,
    },
    content: {
        id: 'content',
        label: 'Content',
        description: 'The content of your message.',
        type: types_1.FieldType.TEXT,
        required: true,
    },
};
//# sourceMappingURL=fields.js.map