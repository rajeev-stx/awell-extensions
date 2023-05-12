"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActionFields = exports.FieldsValidationSchema = exports.fields = void 0;
const types_1 = require("../../../../../../lib/types");
const zod_1 = require("zod");
const lodash_1 = require("lodash");
exports.fields = {
    characteristics: {
        id: 'characteristics',
        label: 'Characteristics to include in summary',
        description: 'A comma-separated list of patient characteristics you would like to include in the summary (eg: first_name, last_name, birth_date). If left blank, all patient profile characteristics will be included.',
        type: types_1.FieldType.STRING,
        required: false,
    },
    language: {
        id: 'language',
        label: 'Language of the summary',
        description: 'The language the summary will be written in. Defaults to "English".',
        type: types_1.FieldType.STRING,
        required: false,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    characteristics: zod_1.z.optional(zod_1.z
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
    language: zod_1.z.optional(zod_1.z.string()).transform((lang) => {
        if ((0, lodash_1.isNil)(lang) || (0, lodash_1.isEmpty)(lang))
            return 'English';
        return lang;
    }),
});
const validateActionFields = (fields) => {
    const parsedData = exports.FieldsValidationSchema.parse(fields);
    return parsedData;
};
exports.validateActionFields = validateActionFields;
//# sourceMappingURL=fields.js.map