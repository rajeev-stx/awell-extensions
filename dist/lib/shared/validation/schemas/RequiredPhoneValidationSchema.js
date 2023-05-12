"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredPhoneValidationSchema = void 0;
const zod_1 = require("zod");
const libphonenumber_js_1 = require("libphonenumber-js");
const lodash_1 = require("lodash");
exports.RequiredPhoneValidationSchema = zod_1.z.custom((val) => {
    if ((0, lodash_1.isEmpty)(val) || (0, lodash_1.isNil)(val))
        return false;
    if (typeof val !== 'string')
        return false;
    return (0, libphonenumber_js_1.isPossiblePhoneNumber)(val);
}, 'Invalid (required) phone number');
//# sourceMappingURL=RequiredPhoneValidationSchema.js.map