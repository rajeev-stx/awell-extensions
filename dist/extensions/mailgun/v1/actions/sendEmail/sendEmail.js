"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const config_1 = require("./config");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const settings_1 = require("../../../settings");
const mailgunSdk_1 = __importDefault(require("../../../common/sdk/mailgunSdk"));
const utils_1 = require("../../../common/utils");
const fields_1 = require("./config/fields");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
exports.sendEmail = {
    key: 'sendEmail',
    title: 'Send email',
    description: 'Send an email to a recipient of your choice.',
    category: marketplace_1.Category.COMMUNICATION,
    fields: config_1.fields,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { to, subject, body } = (0, fields_1.validateActionFields)(payload.fields);
            const { apiKey, domain, region, fromName, fromEmail, testMode } = (0, settings_1.validateSettings)(payload.settings);
            const mg = mailgunSdk_1.default.client({
                username: 'api',
                key: apiKey,
                url: (0, utils_1.getApiUrl)({ region }),
            });
            await mg.messages.create(domain, {
                from: `${fromName} <${fromEmail}>`,
                to: [to],
                subject,
                html: body,
                'o:testmode': testMode,
            });
            await onComplete();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const error = (0, zod_validation_error_1.fromZodError)(err);
                console.log(error.message);
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