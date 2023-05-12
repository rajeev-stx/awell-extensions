"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatient = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const zod_1 = require("zod");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const client_1 = require("../client");
const zod_validation_error_1 = require("zod-validation-error");
const axios_1 = require("axios");
const patient_zod_1 = require("../validation/patient.zod");
const generic_zod_1 = require("../validation/generic.zod");
const fields = {
    patient_id: {
        id: 'patient_id',
        label: 'Patient ID',
        description: 'The patient ID (a number)',
        type: types_1.FieldType.STRING,
        required: true,
    },
    first_name: {
        id: 'first_name',
        label: 'First Name',
        description: 'Maximum length of 70 characters',
        type: types_1.FieldType.STRING,
        required: true,
    },
    last_name: {
        id: 'last_name',
        label: 'Last Name',
        description: 'Maximum length of 70 characters',
        type: types_1.FieldType.STRING,
        required: true,
    },
    dob: {
        id: 'dob',
        label: 'Date of Birth',
        description: 'Date of Birth (YYYY-MM-DD)',
        type: types_1.FieldType.STRING,
        required: true,
    },
    sex: {
        id: 'sex',
        label: 'Sex',
        description: "Sex of a patient. Possible values are 'Male', 'Female', 'Other', 'Unknown'",
        type: types_1.FieldType.STRING,
        required: true,
    },
    primary_physician: {
        id: 'primary_physician',
        label: 'Primary Physician',
        description: 'Primary Physician ID',
        type: types_1.FieldType.STRING,
        required: true,
    },
    caregiver_practice: {
        id: 'caregiver_practice',
        label: 'Caregiver Practice',
        description: 'Caregiver Practice ID',
        type: types_1.FieldType.STRING,
        required: true,
    },
    middle_name: {
        id: 'middle_name',
        label: 'Middle Name',
        description: 'Maximum length of 50 characters',
        type: types_1.FieldType.STRING,
    },
    actual_name: {
        id: 'actual_name',
        label: 'Actual Name',
        description: 'Maximum length of 150 characters',
        type: types_1.FieldType.STRING,
    },
    gender_identity: {
        id: 'gender_identity',
        label: 'Gender identity',
        description: "Gender identity of a patient. Possible values are 'unknown', 'man', 'woman', 'transgender_man', 'transgender_woman', 'nonbinary', 'option_not_listed', 'prefer_not_to_say', 'two_spirit'",
        type: types_1.FieldType.STRING,
    },
    legal_gender_marker: {
        id: 'legal_gender_marker',
        label: 'Legal gender marker',
        description: "Legal gender marker of a patient. Possible values are 'M', 'F', 'X', 'U'",
        type: types_1.FieldType.STRING,
    },
    pronouns: {
        id: 'pronouns',
        label: 'Pronouns',
        description: "Pronouns by which a patient identifies self. Possible values are 'he_him_his', 'she_her_hers', 'they_them_theirs', 'not_listed'",
        type: types_1.FieldType.STRING,
    },
    sexual_orientation: {
        id: 'sexual_orientation',
        label: 'Sexual orientation',
        description: "Possible values are 'unknown', 'straight', 'gay', 'bisexual', 'option_not_listed', 'prefer_not_to_say', 'lesbian', 'queer', 'asexual'",
        type: types_1.FieldType.STRING,
    },
    ssn: {
        id: 'ssn',
        label: 'SSN',
        description: 'Social Security number. A number with 9 digits',
        type: types_1.FieldType.STRING,
    },
    ethnicity: {
        id: 'ethnicity',
        label: 'Ethnicity',
        description: "The ethnicity of the person. Possible values are 'No ethnicity specified', 'Hispanic or Latino', 'Not Hispanic or Latino', 'Declined to specify'.",
        type: types_1.FieldType.STRING,
    },
    race: {
        id: 'race',
        label: 'Race',
        description: "The race of the person. Possible values are 'No race specified', 'American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Other Pacific Islander', 'White', 'Declined to specify'.",
        type: types_1.FieldType.STRING,
    },
    preferred_language: {
        id: 'preferred_language',
        label: 'Preferred language',
        description: "The language preferred by the patient. Full names e.g. 'English', 'Spanish' or 'French'.",
        type: types_1.FieldType.STRING,
    },
    notes: {
        id: 'notes',
        label: 'Notes',
        description: 'Additional notes about the patient. Maximum length of 500 characters.',
        type: types_1.FieldType.STRING,
    },
    previous_first_name: {
        id: 'previous_first_name',
        label: 'Previous first name',
        description: 'The previous first name of the patient',
        type: types_1.FieldType.STRING,
    },
    previous_last_name: {
        id: 'previous_last_name',
        label: 'Previous last name',
        description: 'The previous last name of the patient',
        type: types_1.FieldType.STRING,
    },
};
const dataPoints = {};
exports.updatePatient = {
    key: 'updatePatient',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Update Patient',
    description: "Update a patient profile using Elation's patient API.",
    fields,
    previewable: true,
    dataPoints,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        try {
            const { patient_id, ...patientFields } = payload.fields;
            const patient = patient_zod_1.patientSchema.parse(patientFields);
            const patientId = generic_zod_1.numberId.parse(patient_id);
            // API Call should produce AuthError or something dif.
            const api = (0, client_1.makeAPIClient)(payload.settings);
            await api.updatePatient(patientId, patient);
            await onComplete();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const error = (0, zod_validation_error_1.fromZodError)(err);
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: error.message },
                            error: {
                                category: 'WRONG_INPUT',
                                message: error.message,
                            },
                        },
                    ],
                });
            }
            else if (err instanceof axios_1.AxiosError) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: {
                                en: `${(_a = err.status) !== null && _a !== void 0 ? _a : '(no status code)'} Error: ${err.message}`,
                            },
                            error: {
                                category: 'SERVER_ERROR',
                                message: `${(_b = err.status) !== null && _b !== void 0 ? _b : '(no status code)'} Error: ${err.message}`,
                            },
                        },
                    ],
                });
            }
            else {
                const message = err.message;
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: message },
                            error: {
                                category: 'SERVER_ERROR',
                                message,
                            },
                        },
                    ],
                });
            }
        }
    },
};
//# sourceMappingURL=updatePatient.js.map