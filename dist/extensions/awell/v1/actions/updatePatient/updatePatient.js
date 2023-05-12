"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatient = void 0;
const settings_1 = require("../../../settings");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const config_1 = require("./config");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const awellSdk_1 = __importDefault(require("../../sdk/awellSdk"));
const validation_1 = require("../../../../../lib/shared/validation");
exports.updatePatient = {
    key: 'updatePatient',
    category: marketplace_1.Category.WORKFLOW,
    title: 'Update patient',
    description: 'Update the current patient with new data.',
    fields: config_1.fields,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { settings: { apiUrl, apiKey }, fields: { patientCode, firstName, lastName, birthDate, email, phone, mobilePhone, street, state, country, city, zip, preferredLanguage, sex, }, patient: { id: patientId }, } = (0, validation_1.validate)({
                schema: zod_1.z.object({
                    fields: config_1.FieldsValidationSchema,
                    settings: settings_1.SettingsValidationSchema,
                    patient: config_1.PatientValidationSchema,
                }),
                payload,
            });
            const sdk = new awellSdk_1.default({ apiUrl, apiKey });
            await sdk.updatePatient({
                patient_id: patientId,
                profile: {
                    patient_code: patientCode,
                    first_name: firstName,
                    last_name: lastName,
                    birth_date: birthDate,
                    email,
                    phone,
                    mobile_phone: mobilePhone,
                    address: {
                        street,
                        state,
                        country,
                        city,
                        zip,
                    },
                    preferred_language: preferredLanguage,
                    sex,
                },
            });
            await onComplete();
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
//# sourceMappingURL=updatePatient.js.map