"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const twilio_1 = __importDefault(require("../../../common/sdk/twilio"));
const marketplace_1 = require("../../../../../lib/types/marketplace");
const settings_1 = require("../../../settings");
const config_1 = require("./config");
const validation_1 = require("../../../../../lib/shared/validation");
exports.sendSms = {
    key: 'sendSms',
    title: 'Send SMS',
    description: 'Send an SMS message to a recipient of your choice.',
    category: marketplace_1.Category.COMMUNICATION,
    fields: config_1.fields,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { settings: { accountSid, authToken, fromNumber }, fields: { recipient, message }, } = (0, validation_1.validate)({
                schema: zod_1.z.object({
                    settings: settings_1.SettingsValidationSchema,
                    fields: config_1.FieldsValidationSchema,
                }),
                payload,
            });
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
//# sourceMappingURL=sendSms.js.map