"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDateDifference = void 0;
const marketplace_1 = require("../../../../../lib/types/marketplace");
const config_1 = require("./config");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const date_fns_1 = require("date-fns");
const validation_1 = require("../../../../../lib/shared/validation");
const node_assert_1 = require("node:assert");
exports.calculateDateDifference = {
    key: 'calculateDateDifference',
    title: 'Calculate date difference',
    description: 'Calculate the difference between 2 dates in a unit of your choice.',
    category: marketplace_1.Category.MATH,
    fields: config_1.fields,
    dataPoints: config_1.dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { fields: { dateLeft, dateRight, unit }, } = (0, validation_1.validate)({
                schema: zod_1.z.object({ fields: config_1.FieldsValidationSchema }),
                payload,
            });
            const calculateDifference = () => {
                switch (unit) {
                    case 'seconds': {
                        return (0, date_fns_1.differenceInSeconds)(dateLeft, dateRight);
                    }
                    case 'minutes': {
                        return (0, date_fns_1.differenceInMinutes)(dateLeft, dateRight);
                    }
                    case 'hours': {
                        return (0, date_fns_1.differenceInHours)(dateLeft, dateRight);
                    }
                    case 'days': {
                        return (0, date_fns_1.differenceInDays)(dateLeft, dateRight);
                    }
                    case 'weeks': {
                        return (0, date_fns_1.differenceInWeeks)(dateLeft, dateRight);
                    }
                    case 'months': {
                        return (0, date_fns_1.differenceInMonths)(dateLeft, dateRight);
                    }
                    case 'years': {
                        return (0, date_fns_1.differenceInYears)(dateLeft, dateRight);
                    }
                    default: {
                        throw new node_assert_1.AssertionError({
                            message: "`unit` should be captured by validation. We shouldn't reach this error.",
                        });
                    }
                }
            };
            const dateDifference = calculateDifference();
            await onComplete({
                data_points: {
                    dateDifference: String(dateDifference),
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
                        text: { en: 'Something went wrong while orchestrating the action' },
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
//# sourceMappingURL=calculateDateDifference.js.map