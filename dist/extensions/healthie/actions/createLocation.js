"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocation = void 0;
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
        description: 'The id of the patient in Healthie.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    name: {
        id: 'name',
        label: 'Name',
        description: 'The name of the address.',
        type: types_1.FieldType.STRING,
    },
    country: {
        id: 'country',
        label: 'Country',
        description: 'The country of the patient.',
        type: types_1.FieldType.STRING,
    },
    state: {
        id: 'state',
        label: 'State',
        description: "The state patient's lives in.",
        type: types_1.FieldType.STRING,
    },
    city: {
        id: 'city',
        label: 'City',
        description: 'The city of the patient.',
        type: types_1.FieldType.STRING,
    },
    zip: {
        id: 'zip',
        label: 'Zip code',
        description: 'The zip code of the patient.',
        type: types_1.FieldType.STRING,
    },
    line1: {
        id: 'line1',
        label: 'Line 1',
        description: 'The line 1 of the address.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    line2: {
        id: 'line2',
        label: 'Line 2',
        description: 'The line 2 of the address.',
        type: types_1.FieldType.STRING,
    },
};
const dataPoints = {
    locationId: {
        key: 'locationId',
        valueType: 'string',
    },
};
exports.createLocation = {
    key: 'createLocation',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Create location',
    description: 'Create a location for a patient in Healthie.',
    fields,
    dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b, _c, _d;
        const { fields, settings } = payload;
        const { id, name, country, state, city, zip, line1, line2 } = fields;
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
                const { data } = await sdk.createLocation({
                    input: {
                        user_id: id,
                        name,
                        country,
                        state,
                        city,
                        zip,
                        line1,
                        line2,
                    },
                });
                if (!(0, lodash_1.isNil)((_a = data.createLocation) === null || _a === void 0 ? void 0 : _a.messages)) {
                    const errors = (0, errors_1.mapHealthieToActivityError)((_b = data.createLocation) === null || _b === void 0 ? void 0 : _b.messages);
                    await onError({
                        events: errors,
                    });
                    return;
                }
                const locationId = (_d = (_c = data.createLocation) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.id;
                await onComplete({
                    data_points: {
                        locationId,
                    },
                });
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
//# sourceMappingURL=createLocation.js.map