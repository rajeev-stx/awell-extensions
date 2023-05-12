"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTagFromPatient = void 0;
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
        description: 'The ID of the tag to remove from the patient.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    patient_id: {
        id: 'patient_id',
        label: 'Patient ID',
        description: 'The ID of the patient to remove the tag from.',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
exports.removeTagFromPatient = {
    key: 'removeTagFromPatient',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Remove tag from a patient',
    description: 'Remove a tag from a patient in Healthie.',
    fields,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        const { fields, settings } = payload;
        const { id, patient_id } = fields;
        try {
            if ((0, lodash_1.isNil)(id) || (0, lodash_1.isNil)(patient_id)) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Fields are missing' },
                            error: {
                                category: 'MISSING_FIELDS',
                                message: '`id` or `patient_id` is missing',
                            },
                        },
                    ],
                });
                return;
            }
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.removeTagFromUser({
                    id,
                    taggable_user_id: patient_id,
                });
                if (!(0, lodash_1.isNil)((_a = data.removeAppliedTag) === null || _a === void 0 ? void 0 : _a.messages)) {
                    const errors = (0, errors_1.mapHealthieToActivityError)((_b = data.removeAppliedTag) === null || _b === void 0 ? void 0 : _b.messages);
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
//# sourceMappingURL=removeTagFromPatient.js.map