"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyTagToPatient = void 0;
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
        description: 'The ID of the tag to add to the patient.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    patient_id: {
        id: 'patient_id',
        label: 'Patient ID',
        description: 'The ID of the patient to apply the tag on.',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
exports.applyTagToPatient = {
    key: 'applyTagToPatient',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Apply tag to a patient',
    description: 'Apply a tag to a patient in Healthie.',
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
                const { data } = await sdk.applyTagsToUser({
                    /**
                     * Although the Healthie API allows assigning multiple tags in a single API call, we decided that
                     * the action only assigns one as this simplifies the action code. A user can still assign
                     * multiple tags simply by adding multiple actions.
                     */
                    ids: [id],
                    taggable_user_id: patient_id,
                });
                if (!(0, lodash_1.isNil)((_a = data.bulkApply) === null || _a === void 0 ? void 0 : _a.messages)) {
                    const errors = (0, errors_1.mapHealthieToActivityError)((_b = data.bulkApply) === null || _b === void 0 ? void 0 : _b.messages);
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
//# sourceMappingURL=applyTagToPatient.js.map