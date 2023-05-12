"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = void 0;
const settings_1 = require("../../../settings");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const config_1 = require("./config");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const awellSdk_1 = __importDefault(require("../../sdk/awellSdk"));
const validation_1 = require("../../../../../lib/shared/validation");
exports.deletePatient = {
    key: 'deletePatient',
    category: marketplace_1.Category.WORKFLOW,
    title: 'Delete patient',
    description: 'Delete the patient currently enrolled in the care flow.',
    fields: config_1.fields,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { settings: { apiUrl, apiKey }, patient: { id: patientId }, } = (0, validation_1.validate)({
                schema: zod_1.z.object({
                    settings: settings_1.SettingsValidationSchema,
                    patient: config_1.PatientValidationSchema,
                }),
                payload,
            });
            const sdk = new awellSdk_1.default({ apiUrl, apiKey });
            await sdk.deletePatient({
                patient_id: patientId,
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
//# sourceMappingURL=deletePatient.js.map