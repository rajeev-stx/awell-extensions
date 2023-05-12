"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const config_1 = require("./config");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const settings_1 = require("../../../settings");
const fields_1 = require("./config/fields");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const mailchimpSdk_1 = __importDefault(require("../../../common/sdk/mailchimpSdk"));
const validation_1 = require("../../../../../lib/shared/validation");
exports.sendEmail = {
    key: 'sendEmail',
    title: 'Send email',
    description: 'Send an email.',
    category: marketplace_1.Category.COMMUNICATION,
    fields: config_1.fields,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { patient: { id: patientId }, activity: { id: activityId }, } = payload;
            const { fields: { to, subject, body }, settings: { apiKey, fromName, fromEmail }, } = (0, validation_1.validate)({
                schema: zod_1.z.object({
                    fields: fields_1.FieldsValidationSchema,
                    settings: settings_1.SettingsValidationSchema,
                }),
                payload,
            });
            const apiClient = (0, mailchimpSdk_1.default)(apiKey);
            await apiClient.messages.send({
                message: {
                    from_email: fromEmail,
                    from_name: fromName,
                    to: [{ email: to }],
                    subject,
                    html: body,
                    metadata: {
                        website: 'https://awell.health',
                        awellPatientId: patientId,
                        awellActivityId: activityId,
                    },
                },
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
                            text: { en: error.name },
                            error: {
                                category: 'WRONG_INPUT',
                                message: `${error.message}`,
                            },
                        },
                    ],
                });
                return;
            }
            const error = err;
            await onError({
                events: [
                    {
                        date: new Date().toISOString(),
                        text: { en: 'Something went wrong while orchestration the action' },
                        error: {
                            category: 'SERVER_ERROR',
                            message: error.message,
                        },
                    },
                ],
            });
        }
    },
};
//# sourceMappingURL=sendEmail.js.map