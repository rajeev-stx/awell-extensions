"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSettings = exports.SettingsValidationSchema = exports.settings = void 0;
const zod_1 = require("zod");
const lodash_1 = require("lodash");
exports.settings = {
    apiKey: {
        key: 'apiKey',
        label: 'API key',
        description: 'Your Formsort API key.',
        obfuscated: true,
        required: false,
    },
    environment: {
        key: 'environment',
        label: 'Environment',
        description: 'Should be "staging" or "production". Defaults to "production".',
        obfuscated: false,
        required: false,
    },
};
exports.SettingsValidationSchema = zod_1.z.object({
    /**
     * It's optional because not strictly required for the actions
     * we currently have today + Formsort's API is in alpha currently.
     */
    apiKey: zod_1.z.optional(zod_1.z.string()),
    environment: zod_1.z
        .optional(zod_1.z.enum(['production', 'staging']))
        .transform((env) => {
        if ((0, lodash_1.isNil)(env) || (0, lodash_1.isEmpty)(env))
            return 'production';
        return env;
    }),
});
const validateSettings = (settings) => {
    const parsedData = exports.SettingsValidationSchema.parse(settings);
    return parsedData;
};
exports.validateSettings = validateSettings;
//# sourceMappingURL=settings.js.map