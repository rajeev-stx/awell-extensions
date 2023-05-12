"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidationSchema = exports.settings = void 0;
const zod_1 = require("zod");
const validation_1 = require("../../lib/shared/validation");
exports.settings = {
    accountSid: {
        label: 'Account SID',
        key: 'accountSid',
        obfuscated: true,
        required: true,
        description: 'Find your Account SID at twilio.com/console.',
    },
    authToken: {
        label: 'Auth token',
        key: 'authToken',
        obfuscated: true,
        required: true,
        description: 'Find your Auth Token at twilio.com/console.',
    },
    fromNumber: {
        label: '"From" number',
        key: 'fromNumber',
        obfuscated: false,
        required: true,
        description: '"From" specifies the Twilio phone number, short code, or messaging service that will send the text messages. This must be a Twilio phone number that you own.',
    },
};
exports.SettingsValidationSchema = zod_1.z.object({
    accountSid: zod_1.z.string().min(1, { message: 'Missing Twilio account SID' }),
    authToken: zod_1.z.string().min(1, { message: 'Missing Twilio auth token' }),
    fromNumber: validation_1.E164PhoneValidationSchema,
});
//# sourceMappingURL=settings.js.map