"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJournalEntry = void 0;
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
    type: {
        id: 'type',
        label: 'Type',
        description: 'The type of entry. Valid options are: ["MetricEntry", "FoodEntry", "WorkoutEntry", "MirrorEntry", "SleepEntry", "NoteEntry", "WaterIntakeEntry", "PoopEntry", "SymptomEntry"].',
        type: types_1.FieldType.STRING,
        required: true,
    },
    percieved_hungriness: {
        id: 'percieved_hungriness',
        label: 'Perceived hungriness',
        description: 'A string index of hungriness. Valid options are: ["1", "2", "3"].',
        type: types_1.FieldType.NUMERIC,
    },
};
const dataPoints = {
    journalEntryId: {
        key: 'journalEntryId',
        valueType: 'string',
    },
};
exports.createJournalEntry = {
    key: 'createJournalEntry',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Create journal entry',
    description: 'Create a journal entry in Healthie.',
    fields,
    dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b, _c, _d;
        const { fields, settings } = payload;
        const { id, type, percieved_hungriness } = fields;
        try {
            if ((0, lodash_1.isNil)(id) || (0, lodash_1.isNil)(type)) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Fields are missing' },
                            error: {
                                category: 'MISSING_FIELDS',
                                message: '`id` or `type` is missing',
                            },
                        },
                    ],
                });
                return;
            }
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.createJournalEntry({
                    input: {
                        user_id: id,
                        type,
                        percieved_hungriness: String(percieved_hungriness),
                    },
                });
                if (!(0, lodash_1.isNil)((_a = data.createEntry) === null || _a === void 0 ? void 0 : _a.messages)) {
                    const errors = (0, errors_1.mapHealthieToActivityError)((_b = data.createEntry) === null || _b === void 0 ? void 0 : _b.messages);
                    await onError({
                        events: errors,
                    });
                    return;
                }
                const journalEntryId = (_d = (_c = data.createEntry) === null || _c === void 0 ? void 0 : _c.entry) === null || _d === void 0 ? void 0 : _d.id;
                await onComplete({
                    data_points: {
                        journalEntryId,
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
//# sourceMappingURL=createJournalEntry.js.map