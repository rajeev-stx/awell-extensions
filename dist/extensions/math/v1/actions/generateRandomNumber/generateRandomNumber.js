"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = void 0;
const marketplace_1 = require("../../../../../lib/types/marketplace");
const config_1 = require("./config");
const fields_1 = require("./config/fields");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const validation_1 = require("../../../../../lib/shared/validation");
exports.generateRandomNumber = {
    key: 'generateRandomNumber',
    title: 'Generate random number',
    description: 'Generate a random number between a given range.',
    category: marketplace_1.Category.MATH,
    fields: config_1.fields,
    dataPoints: config_1.dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { fields: { min, max }, } = (0, validation_1.validate)({
                schema: zod_1.z.object({ fields: fields_1.FieldsValidationSchema }),
                payload,
            });
            const [minSerialized, maxSerialized] = [min, max].sort((a, b) => a - b);
            const generatedNumber = Math.floor(Math.random() * (maxSerialized - minSerialized + 1)) +
                minSerialized;
            await onComplete({
                data_points: {
                    generatedNumber: String(generatedNumber),
                },
            });
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
//# sourceMappingURL=generateRandomNumber.js.map