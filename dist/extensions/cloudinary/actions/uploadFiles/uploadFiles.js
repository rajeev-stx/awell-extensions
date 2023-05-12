"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const marketplace_1 = require("../../../../lib/types/marketplace");
const settings_1 = require("../../settings");
const config_1 = require("./config");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const validation_1 = require("../../../../lib/shared/validation");
const fields_1 = require("./config/fields");
exports.uploadFiles = {
    key: 'uploadFiles',
    title: 'Upload files',
    description: 'Allow a stakeholder to upload one or multiple files.',
    category: marketplace_1.Category.CONTENT_AND_FILES,
    fields: config_1.fields,
    // Future improvement: ingest uploaded file URLs as data points into the care flow
    options: {
        stakeholders: {
            label: 'Stakeholder',
            mode: 'single',
        },
    },
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            (0, validation_1.validate)({
                schema: zod_1.z.object({
                    settings: settings_1.SettingsValidationSchema,
                    fields: fields_1.FieldsValidationSchema,
                }),
                payload,
            });
            /**
             * Completion happens in Awell Hosted Pages
             */
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
//# sourceMappingURL=uploadFiles.js.map