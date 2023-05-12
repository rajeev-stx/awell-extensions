"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSettings = exports.SettingsValidationSchema = exports.RegionValidationSchema = exports.settings = void 0;
const lodash_1 = require("lodash");
const zod_1 = require("zod");
exports.settings = {
    apiKey: {
        key: 'apiKey',
        label: 'API Key',
        obfuscated: true,
        required: true,
        description: 'Your Mailgun API Key so the extension can authenticate with the Mailgun API.',
    },
    domain: {
        key: 'domain',
        label: 'Domain',
        obfuscated: false,
        required: true,
        description: 'The domain used to send the emails from.',
    },
    fromName: {
        key: 'fromName',
        label: 'From name',
        obfuscated: false,
        required: true,
        description: 'The name that will be used for the "From" header.',
    },
    fromEmail: {
        key: 'fromEmail',
        label: 'From email',
        obfuscated: false,
        required: true,
        description: 'The email address that will be used for the "From" header.',
    },
    region: {
        key: 'region',
        label: 'Region',
        obfuscated: false,
        required: false,
        description: 'Sending domains can be provisioned in different regions. Pass "EU" for Europe or "US" for United States. Defaults to "US".',
    },
    testMode: {
        key: 'testMode',
        label: 'Test mode',
        obfuscated: false,
        required: false,
        description: 'Set to "Yes" if you want to execute all API calls to Mailgun in test mode.',
    },
};
exports.RegionValidationSchema = zod_1.z.optional(zod_1.z.enum(['EU', 'eu', 'US', 'us']));
exports.SettingsValidationSchema = zod_1.z.object({
    apiKey: zod_1.z.string(),
    domain: zod_1.z.string(),
    fromName: zod_1.z.string(),
    fromEmail: zod_1.z.string().email(),
    region: exports.RegionValidationSchema,
    testMode: zod_1.z.optional(zod_1.z.enum(['Yes', 'yes', 'No', 'no'])).transform((val) => {
        const serializedVal = (0, lodash_1.lowerCase)(val);
        if (serializedVal === 'yes')
            return true;
        return false;
    }),
});
const validateSettings = (settings) => {
    const parsedData = exports.SettingsValidationSchema.parse(settings);
    return parsedData;
};
exports.validateSettings = validateSettings;
//# sourceMappingURL=settings.js.map