"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStringOptional = void 0;
const zod_1 = require("zod");
/**
 * Allows `undefined` and empty strings `''` to be used as a valid value for a string schema.
 * Returns `undefined` in those two cases.
 */
const makeStringOptional = (schema) => zod_1.z.union([schema.optional(), zod_1.z.literal('').transform(() => undefined)]);
exports.makeStringOptional = makeStringOptional;
//# sourceMappingURL=generic.js.map