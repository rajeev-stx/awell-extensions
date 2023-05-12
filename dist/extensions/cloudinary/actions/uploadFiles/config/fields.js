"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
const lodash_1 = require("lodash");
const zod_1 = require("zod");
const types_1 = require("../../../../../lib/types");
exports.fields = {
    uploadPreset: {
        id: 'uploadPreset',
        label: 'Upload preset',
        description: 'The name of an upload preset defined for your product environment. If left empty, the preset defined in the extension settings will be used.',
        type: types_1.FieldType.STRING,
        required: false,
    },
    folder: {
        id: 'folder',
        label: 'Folder',
        description: 'Upload files to the specified folder. If left empty, the folder defined in the extension settings will be used.',
        type: types_1.FieldType.STRING,
        required: false,
    },
    tags: {
        id: 'tags',
        label: 'Tags',
        description: 'A comma-separated string of tags to assign to the uploaded assets.',
        type: types_1.FieldType.STRING,
        required: false,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    uploadPreset: zod_1.z.optional(zod_1.z.string()),
    folder: zod_1.z.optional(zod_1.z.string()),
    tags: zod_1.z.optional(zod_1.z
        .string()
        // Make sure all white spaces are stripped
        .transform((chars) => chars.replace(/\s/g, ''))
        .transform((chars) => chars.split(','))
        // Make sure there are no undefined or empty characteristics
        .transform((charsArray) => charsArray.filter((chars) => {
        if ((0, lodash_1.isNil)(chars) || (0, lodash_1.isEmpty)(chars))
            return false;
        return true;
    }))),
});
//# sourceMappingURL=fields.js.map