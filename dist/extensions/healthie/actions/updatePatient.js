"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatient = void 0;
const lodash_1 = require("lodash");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const errors_1 = require("../errors");
const fields = {
    id: {
        id: 'id',
        label: 'ID',
        description: 'The id of the patient in Healthie.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    first_name: {
        id: 'first_name',
        label: 'First name',
        description: 'The first name of the patient.',
        type: types_1.FieldType.STRING,
    },
    last_name: {
        id: 'last_name',
        label: 'Last name',
        description: 'The last name of the patient.',
        type: types_1.FieldType.STRING,
    },
    legal_name: {
        id: 'legal_name',
        label: 'Legal name',
        description: "The patient's legal name which will be used in CMS 1500 Claims, Invoices, and Superbills.",
        type: types_1.FieldType.STRING,
    },
    skipped_email: {
        id: 'skipped_email',
        label: 'Skipped email',
        type: types_1.FieldType.BOOLEAN,
    },
    email: {
        id: 'email',
        label: 'Email',
        description: 'The email address of the patient.',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.EMAIL,
    },
    dob: {
        id: 'dob',
        label: 'Date of birth',
        description: 'Date of birth of the patient',
        type: types_1.FieldType.DATE,
    },
    phone_number: {
        id: 'phone_number',
        label: 'Phone number',
        description: 'The phone number of the patient.',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.PHONE,
    },
    provider_id: {
        id: 'provider_id',
        label: 'Provider ID',
        description: 'This is the ID of the provider and defaults to the user the API key is associated with. Also known as the `dietitian_id`.',
        type: types_1.FieldType.STRING,
    },
    user_group_id: {
        id: 'user_group_id',
        label: 'User group ID',
        description: 'The user group the patient belongs to.',
        type: types_1.FieldType.STRING,
    },
    active: {
        id: 'active',
        label: 'Active',
        description: 'Whether the patient is still active.',
        type: types_1.FieldType.BOOLEAN,
    },
    height: {
        id: 'height',
        label: 'Height',
        description: 'The height of the patient.',
        type: types_1.FieldType.STRING,
    },
    gender: {
        id: 'gender',
        label: 'Gender',
        description: 'The gender of the patient. Either "Female", "Male", or "Other".',
        type: types_1.FieldType.STRING,
    },
    gender_identity: {
        id: 'gender_identity',
        label: 'Gender identity',
        description: 'Should only be passed when gender is "Other"',
        type: types_1.FieldType.STRING,
    },
    sex: {
        id: 'sex',
        label: 'Sex',
        description: 'The sex of the patient. Either "Female", "Male".',
        type: types_1.FieldType.STRING,
    },
};
exports.updatePatient = {
    key: 'updatePatient',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Update a patient',
    description: 'Update a patient in Healthie.',
    fields,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        const { fields, settings } = payload;
        const { id, first_name, last_name, legal_name, email, phone_number, provider_id, gender, gender_identity, height, sex, user_group_id, active, dob, skipped_email, } = fields;
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
                const { data } = await sdk.updatePatient({
                    input: {
                        id,
                        first_name,
                        last_name,
                        legal_name,
                        email,
                        phone_number,
                        dietitian_id: provider_id === '' ? undefined : provider_id,
                        gender,
                        gender_identity,
                        height,
                        sex,
                        user_group_id,
                        active,
                        dob,
                        skipped_email,
                    },
                });
                if (!(0, lodash_1.isNil)((_a = data.updateClient) === null || _a === void 0 ? void 0 : _a.messages)) {
                    const errors = (0, errors_1.mapHealthieToActivityError)((_b = data.updateClient) === null || _b === void 0 ? void 0 : _b.messages);
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
//# sourceMappingURL=updatePatient.js.map