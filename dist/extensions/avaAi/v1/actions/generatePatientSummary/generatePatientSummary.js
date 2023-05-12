"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePatientSummary = void 0;
const config_1 = require("./config");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const settings_1 = require("../../../settings");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const openAiSdk_1 = __importDefault(require("../../../common/sdk/openAiSdk"));
const openai_1 = require("openai");
const utils_1 = require("./utils");
exports.generatePatientSummary = {
    key: 'generatePatientSummary',
    title: 'Generate patient summary',
    description: "Generates a human-readable and brief summary about the patient based on the characteristics in the patient's profile.",
    category: marketplace_1.Category.AI,
    fields: config_1.fields,
    dataPoints: config_1.dataPoints,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        try {
            const { patient } = payload;
            const { openAiApiKey } = (0, settings_1.validateSettings)(payload.settings);
            const { characteristics, language } = (0, config_1.validateActionFields)(payload.fields);
            const configuration = new openai_1.Configuration({
                apiKey: openAiApiKey,
            });
            const openai = new openAiSdk_1.default(configuration);
            const prompt = (0, utils_1.generatePrompt)(patient, characteristics, language);
            const TOKENS_FOR_PROMPT = 400;
            const TOKENS_FOR_COMPLETION = 100;
            const result = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt,
                temperature: 0,
                max_tokens: TOKENS_FOR_PROMPT + TOKENS_FOR_COMPLETION,
                n: 1, // Only generate one completion per prompt
            });
            await onComplete({
                data_points: {
                    prompt,
                    patientSummary: String((_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.choices[0]) === null || _b === void 0 ? void 0 : _b.text),
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
                        text: { en: 'Something went wrong while orchestration the action' },
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
//# sourceMappingURL=generatePatientSummary.js.map