"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidationSchema = void 0;
const zod_1 = require("zod");
exports.MessageValidationSchema = zod_1.z
    .string()
    .min(1, { message: 'Missing or empty message' })
    .max(1600, { message: 'Message can not be longer than 1600 characters' });
//# sourceMappingURL=validation.js.map