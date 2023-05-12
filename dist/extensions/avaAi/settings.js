"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSettings = exports.SettingsValidationSchema = exports.settings = void 0;
const zod_1 = require("zod");
exports.settings = {
    openAiApiKey: {
        key: 'openAiApiKey',
        label: 'Open AI API Key',
        obfuscated: true,
        required: true,
        description: 'The OpenAI API uses API keys for authentication',
    },
};
exports.SettingsValidationSchema = zod_1.z.object({
    openAiApiKey: zod_1.z.string(),
});
const validateSettings = (settings) => {
    const parsedData = exports.SettingsValidationSchema.parse(settings);
    return parsedData;
};
exports.validateSettings = validateSettings;
//# sourceMappingURL=settings.js.map