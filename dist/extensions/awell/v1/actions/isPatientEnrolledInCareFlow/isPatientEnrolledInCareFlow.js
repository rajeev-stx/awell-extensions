"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPatientEnrolledInCareFlow = void 0;
const settings_1 = require("../../../settings");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const config_1 = require("./config");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const awellSdk_1 = __importDefault(require("../../sdk/awellSdk"));
const validation_1 = require("../../../../../lib/shared/validation");
const graphql_1 = require("../../gql/graphql");
const lodash_1 = require("lodash");
exports.isPatientEnrolledInCareFlow = {
    key: 'isPatientEnrolledInCareFlow',
    category: marketplace_1.Category.WORKFLOW,
    title: 'Is patient already enrolled in care flow',
    description: 'Checks whether the patient is already enrolled in the current care flow definition.',
    fields: config_1.fields,
    dataPoints: config_1.dataPoints,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        try {
            const { settings: { apiUrl, apiKey }, patient: { id: patientId }, pathway: { id: pathwayId, definition_id: currentPathwayDefinitionId }, fields: { pathwayStatus, careFlowDefinitionIds }, } = (0, validation_1.validate)({
                schema: zod_1.z.object({
                    settings: settings_1.SettingsValidationSchema,
                    patient: config_1.PatientValidationSchema,
                    pathway: config_1.PathwayValidationSchema,
                    fields: config_1.FieldsValidationSchema,
                }),
                payload,
            });
            const sdk = new awellSdk_1.default({ apiUrl, apiKey });
            const results = await sdk.getPatientCareFlows({
                patient_id: patientId,
                status: pathwayStatus !== null && pathwayStatus !== void 0 ? pathwayStatus : [graphql_1.PathwayStatus.Active],
            });
            const getCareFlowsThatMatchFilters = () => results
                // Exclude the current care flow instance
                .filter((careFlow) => careFlow.id !== pathwayId)
                // Filter by care flow definition ids
                .filter((careFlow) => {
                if ((0, lodash_1.isNil)(careFlowDefinitionIds) ||
                    (0, lodash_1.isEmpty)(careFlowDefinitionIds)) {
                    return (careFlow.pathway_definition_id === currentPathwayDefinitionId);
                }
                return careFlowDefinitionIds.includes(careFlow.pathway_definition_id);
            })
                // Filter by status
                .filter((careFlow) => {
                if ((0, lodash_1.isNil)(pathwayStatus) || (0, lodash_1.isEmpty)(pathwayStatus)) {
                    return careFlow.status === graphql_1.PathwayStatus.Active;
                }
                return pathwayStatus.includes(careFlow.status);
            });
            const careFlows = getCareFlowsThatMatchFilters();
            const isPatientEnrolledInCareFlowResult = careFlows.length > 0;
            await onComplete({
                data_points: {
                    result: String(isPatientEnrolledInCareFlowResult),
                    nbrOfResults: String(careFlows.length),
                    careFlowIds: careFlows.map((careFlow) => careFlow.id).join(','),
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
//# sourceMappingURL=isPatientEnrolledInCareFlow.js.map