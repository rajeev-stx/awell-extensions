"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = void 0;
const lodash_1 = require("lodash");
const errors_1 = require("../errors");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const fields = {
    id: {
        id: 'id',
        label: 'ID',
        description: 'The id of the appointment in Healthie.',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
exports.cancelAppointment = {
    key: 'cancelAppointment',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Cancel appointment',
    description: 'Cancel an appointment in Healthie.',
    fields,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        const { fields, settings } = payload;
        const { id } = fields;
        try {
            if ((0, lodash_1.isNil)(id)) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Fields are missing' },
                            error: {
                                category: 'MISSING_FIELDS',
                                message: '`id` is missing',
                            },
                        },
                    ],
                });
                return;
            }
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.updateAppointment({
                    input: {
                        id,
                        pm_status: 'Cancelled',
                    },
                });
                if (!(0, lodash_1.isNil)((_a = data.updateAppointment) === null || _a === void 0 ? void 0 : _a.messages)) {
                    const errors = (0, errors_1.mapHealthieToActivityError)((_b = data.updateAppointment) === null || _b === void 0 ? void 0 : _b.messages);
                    await onError({
                        events: errors,
                    });
                    return;
                }
                await onComplete();
            }
            else {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'API client requires an API url and API key' },
                            error: {
                                category: 'MISSING_SETTINGS',
                                message: 'Missing api url or api key',
                            },
                        },
                    ],
                });
            }
        }
        catch (err) {
            const error = err;
            await onError({
                events: [
                    {
                        date: new Date().toISOString(),
                        text: { en: 'Healthie API reported an error' },
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
//# sourceMappingURL=cancelAppointment.js.map