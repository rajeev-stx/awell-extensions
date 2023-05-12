"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidationSchema = exports.RegionValidationSchema = exports.settings = void 0;
const zod_1 = require("zod");
exports.settings = {
    apiKey: {
        key: 'apiKey',
        label: 'API Key',
        obfuscated: true,
        required: true,
        description: 'Your Mailchimp API Key so the extension can authenticate with the Mailchimp API.',
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
};
exports.RegionValidationSchema = zod_1.z.optional(zod_1.z.enum(['EU', 'eu', 'US', 'us']));
exports.SettingsValidationSchema = zod_1.z.object({
    apiKey: zod_1.z.string(),
    fromName: zod_1.z.string(),
    fromEmail: zod_1.z.string().email(),
});
//# sourceMappingURL=settings.js.map