"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPatientsByPatientCode = void 0;
const settings_1 = require("../../../settings");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const config_1 = require("./config");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const awellSdk_1 = __importDefault(require("../../sdk/awellSdk"));
const validation_1 = require("../../../../../lib/shared/validation");
exports.searchPatientsByPatientCode = {
    key: 'searchPatientsByPatientCode',
    category: marketplace_1.Category.WORKFLOW,
    title: 'Search patient (by patient code)',
    description: "Search whether the current patient already exists. Search happens based on the `patient_code` field which is taken from the patient's profile.",
    fields: config_1.fields,
    dataPoints: config_1.dataPoints,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { settings: { apiUrl, apiKey }, patient: { id: patientId, profile: { patient_code }, }, } = (0, validation_1.validate)({
                schema: zod_1.z.object({
                    settings: settings_1.SettingsValidationSchema,
                    patient: config_1.PatientValidationSchema,
                }),
                payload,
            });
            const sdk = new awellSdk_1.default({ apiUrl, apiKey });
            const results = await sdk.searchPatientsByPatientCode({
                patient_code,
            });
            /**
             * When searching for other patients with the same patient code,
             * we need to exclude the current patient from the search results.
             * Otherwise the result would always be true.
             */
            const resultsWithoutCurrentPatient = results.filter((res) => res.id !== patientId);
            const numberOfPatientsFound = resultsWithoutCurrentPatient.length;
            const patientAlreadyExists = numberOfPatientsFound > 0;
            const awellPatientIds = resultsWithoutCurrentPatient
                .map((result) => result.id)
                .join(',');
            await onComplete({
                data_points: {
                    patientAlreadyExists: String(patientAlreadyExists),
                    numberOfPatientsFound: String(numberOfPatientsFound),
                    awellPatientIds,
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
                            text: { en: error.name },
                            error: {
                                category: 'WRONG_INPUT',
                                message: `${error.message}`,
                            },
                        },
                    ],
                });
                return;
            }
            const error = err;
            await onError({
                events: [
                    {
                        date: new Date().toISOString(),
                        text: { en: 'Awell API reported an error' },
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
//# sourceMappingURL=searchPatientsByPatientCode.js.map