"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatient = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const client_1 = require("../client");
const zod_validation_error_1 = require("zod-validation-error");
const axios_1 = require("axios");
const generic_zod_1 = require("../validation/generic.zod");
const fields = {
    patientId: {
        id: 'patientId',
        label: 'Patient ID',
        description: 'The patient ID (a number)',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
const dataPoints = {
    first_name: {
        key: 'first_name',
        valueType: 'string',
    },
    last_name: {
        key: 'last_name',
        valueType: 'string',
    },
    dob: {
        key: 'dob',
        valueType: 'string',
    },
    sex: {
        key: 'sex',
        valueType: 'string',
    },
    primary_physician: {
        key: 'primary_physician',
        valueType: 'string',
    },
    caregiver_practice: {
        key: 'caregiver_practice',
        valueType: 'string',
    },
    mobile_phone: {
        key: 'mobile_phone',
        valueType: 'string',
    },
    middle_name: {
        key: 'middle_name',
        valueType: 'string',
    },
    actual_name: {
        key: 'actual_name',
        valueType: 'string',
    },
    gender_identity: {
        key: 'gender_identity',
        valueType: 'string',
    },
    legal_gender_marker: {
        key: 'legal_gender_marker',
        valueType: 'string',
    },
    pronouns: {
        key: 'pronouns',
        valueType: 'string',
    },
    sexual_orientation: {
        key: 'sexual_orientation',
        valueType: 'string',
    },
    ssn: {
        key: 'ssn',
        valueType: 'string',
    },
    ethnicity: {
        key: 'ethnicity',
        valueType: 'string',
    },
    race: {
        key: 'race',
        valueType: 'string',
    },
    preferred_language: {
        key: 'preferred_language',
        valueType: 'string',
    },
    notes: {
        key: 'notes',
        valueType: 'string',
    },
    previous_first_name: {
        key: 'previous_first_name',
        valueType: 'string',
    },
    previous_last_name: {
        key: 'previous_last_name',
        valueType: 'string',
    },
};
exports.getPatient = {
    key: 'getPatient',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Get Patient',
    description: "Retrieve a patient profile using Elation's patient API.",
    fields,
    previewable: true,
    dataPoints,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b, _c, _d;
        try {
            const patientId = generic_zod_1.numberId.parse(payload.fields.patientId);
            // API Call should produce AuthError or something dif.
            const api = (0, client_1.makeAPIClient)(payload.settings);
            const patientInfo = await api.getPatient(patientId);
            await onComplete({
                data_points: {
                    first_name: patientInfo.first_name,
                    last_name: patientInfo.last_name,
                    dob: patientInfo.dob,
                    sex: patientInfo.sex,
                    primary_physician: String(patientInfo.primary_physician),
                    caregiver_practice: String(patientInfo.caregiver_practice),
                    mobile_phone: String((_b = (_a = patientInfo.phones) === null || _a === void 0 ? void 0 : _a.find((p) => p.phone_type === 'Mobile')) === null || _b === void 0 ? void 0 : _b.phone),
                    middle_name: patientInfo.middle_name,
                    actual_name: patientInfo.actual_name,
                    gender_identity: patientInfo.gender_identity,
                    legal_gender_marker: patientInfo.legal_gender_marker,
                    pronouns: patientInfo.pronouns,
                    sexual_orientation: patientInfo.sexual_orientation,
                    ssn: patientInfo.ssn,
                    ethnicity: patientInfo.ethnicity,
                    race: patientInfo.race,
                    preferred_language: patientInfo.preferred_language,
                    notes: patientInfo.notes,
                    previous_first_name: patientInfo.previous_first_name,
                    previous_last_name: patientInfo.previous_last_name,
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
                                en: `${(_c = err.status) !== null && _c !== void 0 ? _c : '(no status code)'} Error: ${err.message}`,
                            },
                            error: {
                                category: 'SERVER_ERROR',
                                message: `${(_d = err.status) !== null && _d !== void 0 ? _d : '(no status code)'} Error: ${err.message}`,
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
//# sourceMappingURL=getPatient.js.map