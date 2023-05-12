"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientValidationSchema = void 0;
const zod_1 = require("zod");
exports.PatientValidationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    profile: zod_1.z.object({ patient_code: zod_1.z.string() }),
});
//# sourceMappingURL=patient.js.map