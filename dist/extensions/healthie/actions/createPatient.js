"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatient = void 0;
const lodash_1 = require("lodash");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const errors_1 = require("../errors");
const fields = {
    first_name: {
        id: 'first_name',
        label: 'First name',
        description: 'The first name of the patient.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    last_name: {
        id: 'last_name',
        label: 'Last name',
        description: 'The last name of the patient.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    legal_name: {
        id: 'legal_name',
        label: 'Legal name',
        description: "The patient's legal name which will be used in CMS 1500 Claims, Invoices, and Superbills.",
        type: types_1.FieldType.STRING,
    },
    skipped_email: {
        id: 'skipped_email',
        label: 'Skipped email.',
        description: 'When set to "false", an `email` is not required to create the patient.',
        type: types_1.FieldType.BOOLEAN,
    },
    email: {
        id: 'email',
        label: 'Email',
        description: 'The email address of the patient.',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.EMAIL,
        required: true, // required until conditional field validation is implemented (based on `skipped_email`)
    },
    phone_number: {
        id: 'phone_number',
        label: 'Phone number',
        description: 'The phone number of the patient.',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.PHONE,
    },
    send_invite: {
        id: 'send_invite',
        label: 'Send invite email',
        description: 'Whether an invite email should be sent to the newly created patient.',
        type: types_1.FieldType.BOOLEAN,
    },
    provider_id: {
        id: 'provider_id',
        label: 'Provider ID',
        description: 'This is the ID of the provider and defaults to the user the API key is associated with. Also known as the `dietitian_id`.',
        type: types_1.FieldType.STRING,
    },
};
const dataPoints = {
    healthiePatientId: {
        key: 'healthiePatientId',
        valueType: 'string',
    },
};
exports.createPatient = {
    key: 'createPatient',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Create a patient',
    description: 'Create a patient in Healthie.',
    fields,
    dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b, _c, _d;
        const { fields, settings } = payload;
        const { first_name, last_name, email, phone_number, provider_id, legal_name, send_invite, skipped_email, } = fields;
        try {
            if ((0, lodash_1.isNil)(first_name) || (0, lodash_1.isNil)(last_name)) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Fields are missing' },
                            error: {
                                category: 'MISSING_FIELDS',
                                message: '`first_name` or `last_name` is missing',
                            },
                        },
                    ],
                });
                return;
            }
            const dont_send_welcome = send_invite !== true;
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.createPatient({
                    input: {
                        first_name,
                        last_name,
                        legal_name,
                        email,
                        phone_number,
                        dietitian_id: provider_id === '' ? undefined : provider_id,
                        skipped_email,
                        dont_send_welcome,
                    },
                });
                if (!(0, lodash_1.isNil)((_a = data.createClient) === null || _a === void 0 ? void 0 : _a.messages)) {
                    const errors = (0, errors_1.mapHealthieToActivityError)((_b = data.createClient) === null || _b === void 0 ? void 0 : _b.messages);
                    await onError({
                        events: errors,
                    });
                    return;
                }
                const healthiePatientId = (_d = (_c = data.createClient) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id;
                await onComplete({
                    data_points: {
                        healthiePatientId,
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
//# sourceMappingURL=createPatient.js.map