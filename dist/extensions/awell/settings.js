"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidationSchema = exports.settings = void 0;
const zod_1 = require("zod");
exports.settings = {
    apiUrl: {
        key: 'apiUrl',
        label: 'API url',
        obfuscated: false,
        required: true,
        description: 'The environment specific API url.',
    },
    apiKey: {
        key: 'apiKey',
        label: 'API key',
        obfuscated: true,
        required: true,
        description: 'Your Awell (Orchestration) API key.',
    },
};
exports.SettingsValidationSchema = zod_1.z.object({
    apiUrl: zod_1.z.string(),
    apiKey: zod_1.z.string(),
});
//# sourceMappingURL=settings.js.map