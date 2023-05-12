"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalPhoneValidationSchema = void 0;
const zod_1 = require("zod");
const libphonenumber_js_1 = require("libphonenumber-js");
const lodash_1 = require("lodash");
exports.OptionalPhoneValidationSchema = zod_1.z.custom((val) => {
    if ((0, lodash_1.isEmpty)(val) || (0, lodash_1.isNil)(val))
        return true;
    if (typeof val !== 'string')
        return false;
    return (0, libphonenumber_js_1.isPossiblePhoneNumber)(val);
}, 'Invalid (optional) phone number');
//# sourceMappingURL=OptionalPhoneValidationSchema.js.map