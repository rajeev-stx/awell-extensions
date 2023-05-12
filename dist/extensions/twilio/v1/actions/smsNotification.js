"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsNotification = void 0;
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const twilio_1 = __importDefault(require("../../common/sdk/twilio"));
const types_1 = require("../../../../lib/types");
const settings_1 = require("../../settings");
const marketplace_1 = require("../../../../lib/types/marketplace");
const validation_1 = require("../../common/validation");
const validation_2 = require("../../../../lib/shared/validation");
const fields = {
    recipient: {
        id: 'recipient',
        label: '"To" phone number',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.PHONE,
        description: 'To what phone number would you like to send an SMS message?',
        required: true,
    },
    message: {
        id: 'message',
        label: 'Message',
        type: types_1.FieldType.TEXT,
        required: true,
    },
};
const Fields = zod_1.z.object({
    recipient: validation_2.E164PhoneValidationSchema,
    message: validation_1.MessageValidationSchema,
});
const Schema = zod_1.z.object({
    fields: Fields,
    settings: settings_1.SettingsValidationSchema,
});
exports.smsNotification = {
    key: 'smsNotification',
    title: 'Send SMS to phone number',
    description: 'Send an SMS message to a phone number.',
    category: marketplace_1.Category.COMMUNICATION,
    fields,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { fields: { recipient, message }, settings: { accountSid, authToken, fromNumber }, } = (0, validation_2.validate)({ schema: Schema, payload });
            const client = (0, twilio_1.default)(accountSid, authToken, {
                region: 'IE1',
                accountSid,
            });
            await client.messages.create({
                body: message,
                from: fromNumber,
                to: recipient,
            });
            await onComplete();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const error = (0, zod_validation_error_1.fromZodError)(err);
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: error.message },
                            error: {
                                category: 'BAD_REQUEST',
                                message: error.message,
                            },
                        },
                    ],
                });
            }
            else {
                const message = err.message;
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: message },
                            error: {
                                category: 'SERVER_ERROR',
                                message,
                            },
                        },
                    ],
                });
            }
        }
    },
};
//# sourceMappingURL=smsNotification.js.map