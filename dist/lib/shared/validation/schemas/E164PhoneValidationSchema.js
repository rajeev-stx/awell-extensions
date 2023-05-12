"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E164PhoneValidationOptionalSchema = exports.E164PhoneValidationSchema = void 0;
const zod_1 = require("zod");
const libphonenumber_js_1 = require("libphonenumber-js");
const generic_1 = require("../generic");
exports.E164PhoneValidationSchema = zod_1.z
    .string()
    .transform((value) => {
    try {
        return (0, libphonenumber_js_1.parsePhoneNumberWithError)(value);
    }
    catch (error) {
        return error;
    }
})
    .superRefine((value, ctx) => {
    if ('message' in value) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: `Phone number is invalid (${value.message})`,
        });
    }
})
    .transform((value) => {
    return value.number;
});
exports.E164PhoneValidationOptionalSchema = (0, generic_1.makeStringOptional)(exports.E164PhoneValidationSchema);
//# sourceMappingURL=E164PhoneValidationSchema.js.map