"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSettings = exports.SettingsValidationSchema = exports.settings = void 0;
const zod_1 = require("zod");
const lodash_1 = require("lodash");
exports.settings = {
    apiKey: {
        label: 'API Key',
        key: 'apiKey',
        obfuscated: true,
        required: true,
        description: 'Enter an API key so Awell can communicate with the Dropbox Sign API.',
    },
    clientId: {
        label: 'Client ID',
        key: 'clientId',
        obfuscated: false,
        required: true,
        description: 'The client ID of the app created in Dropbox Sign.',
    },
    testMode: {
        label: 'Test mode',
        key: 'testMode',
        obfuscated: false,
        required: false,
        description: 'Set to "Yes" if you want to execute all API calls to DropboxSign in test mode. Set to "No" if you want to disable test mode. Keep in mind that when test mode is disabled, you must upgrade to a paid DropboxSign API plan to create signature requests. Defaults to "No".',
    },
};
exports.SettingsValidationSchema = zod_1.z.object({
    apiKey: zod_1.z.string(),
    clientId: zod_1.z.string(),
    testMode: zod_1.z
        .optional(zod_1.z.enum(['Yes', 'No', 'yes', 'no']))
        .transform((testMode) => {
        if ((0, lodash_1.isEmpty)(testMode) || (0, lodash_1.isNil)(testMode))
            return false;
        const serializedTestmode = (0, lodash_1.lowerCase)(testMode);
        if (serializedTestmode === 'yes')
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