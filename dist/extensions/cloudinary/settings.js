"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidationSchema = exports.settings = void 0;
const zod_1 = require("zod");
exports.settings = {
    cloudName: {
        key: 'cloudName',
        label: 'Cloud name',
        description: 'Your Cloudinary product environment cloud name. This can be found in the Cloudinary console.',
        obfuscated: false,
        required: true,
    },
    uploadPreset: {
        key: 'uploadPreset',
        label: 'Upload preset',
        description: 'The name of an upload preset defined for your product environment. You can always overwrite the preset on the action level.',
        obfuscated: false,
        required: true,
    },
    folder: {
        key: 'folder',
        label: 'Folder',
        description: 'Upload files to the specified folder. You can always overwrite the folder on the action level.',
        obfuscated: false,
        required: false,
    },
};
exports.SettingsValidationSchema = zod_1.z.object({
    cloudName: zod_1.z.string(),
    uploadPreset: zod_1.z.string(),
    folder: zod_1.z.optional(zod_1.z.string()),
});
//# sourceMappingURL=settings.js.map