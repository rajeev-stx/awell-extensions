"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFormCompletionRequest = void 0;
const lodash_1 = require("lodash");
const errors_1 = require("../errors");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const fields = {
    healthie_patient_id: {
        id: 'healthie_patient_id',
        label: 'Healthie Patient ID',
        description: 'The ID of the patient that should receive the form completion request.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    form_id: {
        id: 'form_id',
        label: 'Form ID',
        description: 'The ID of the form you would like the patient to complete.',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
exports.sendFormCompletionRequest = {
    key: 'sendFormCompletionRequest',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Send form completion request',
    description: 'Send a form completion request to a patient in Healthie.',
    fields,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        const { fields, settings } = payload;
        const { healthie_patient_id, form_id } = fields;
        try {
            if ((0, lodash_1.isNil)(healthie_patient_id) || (0, lodash_1.isNil)(form_id)) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Fields are missing' },
                            error: {
                                category: 'MISSING_FIELDS',
                                message: '`healthie_patient_id` or `form_id` is missing',
                            },
                        },
                    ],
                });
                return;
            }
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.createFormCompletionRequest({
                    input: {
                        /**
                         * Although the Healthie API call allows sending form completion requests to multiple users per API call,
                         * we decided that every action only sends one form completion request.
                         * This heavily simplifies the logic and better fits our domain model.
                         * If a user would like to send multiple form completion requests,
                         * they you can just add multiple actions.
                         */
                        recipient_ids: healthie_patient_id,
                        form: form_id,
                    },
                });
                if (!(0, lodash_1.isNil)((_a = data.createRequestedFormCompletion) === null || _a === void 0 ? void 0 : _a.messages)) {
                    const errors = (0, errors_1.mapHealthieToActivityError)((_b = data.createRequestedFormCompletion) === null || _b === void 0 ? void 0 : _b.messages);
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
//# sourceMappingURL=sendFormCompletionRequest.js.map