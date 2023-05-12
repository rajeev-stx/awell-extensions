"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientSmsNotification = void 0;
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const twilio_1 = __importDefault(require("../../common/sdk/twilio"));
const types_1 = require("../../../../lib/types");
const settings_1 = require("../../settings");
const marketplace_1 = require("../../../../lib/types/marketplace");
const validation_1 = require("../../common/validation");
const validation_2 = require("../../../../lib/shared/validation");
const fields = {
    message: {
        id: 'message',
        label: 'Message',
        type: types_1.FieldType.TEXT,
        required: true,
    },
};
const PatientProfile = zod_1.z.object({
    mobile_phone: validation_2.E164PhoneValidationSchema,
});
const PatientValidationSchema = zod_1.z.object({ profile: PatientProfile });
const Schema = zod_1.z.object({
    patient: PatientValidationSchema,
    fields: zod_1.z.object({ message: validation_1.MessageValidationSchema }),
    settings: settings_1.SettingsValidationSchema,
});
exports.patientSmsNotification = {
    key: 'patientSmsNotification',
    title: 'Send SMS to patient',
    category: marketplace_1.Category.COMMUNICATION,
    description: 'Send an SMS message to the patient enrolled in this care flow.',
    fields,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { patient: { profile: { mobile_phone }, }, fields: { message }, settings: { accountSid, authToken, fromNumber }, } = (0, validation_2.validate)({ schema: Schema, payload });
            const client = (0, twilio_1.default)(accountSid, authToken, {
                region: 'IE1',
                accountSid,
            });
            await client.messages.create({
                body: message,
                from: fromNumber,
                to: mobile_phone,
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
//# sourceMappingURL=patientSmsNotification.js.map