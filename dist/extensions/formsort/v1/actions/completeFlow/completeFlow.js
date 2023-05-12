"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeFlow = void 0;
const config_1 = require("./config");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const fields_1 = require("./config/fields");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
exports.completeFlow = {
    key: 'completeFlow',
    title: 'Complete flow',
    description: 'Let a stakeholder complete a Formsort flow with Awell Hosted Pages.',
    category: marketplace_1.Category.FORMS,
    fields: config_1.fields,
    options: {
        stakeholders: {
            label: 'Stakeholder',
            mode: 'single',
        },
    },
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            (0, fields_1.validateActionFields)(payload.fields);
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
//# sourceMappingURL=completeFlow.js.map