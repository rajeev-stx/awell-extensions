"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPointsValidationSchema = exports.dataPoints = void 0;
const zod_1 = require("zod");
exports.dataPoints = {
    generatedNumber: {
        key: 'generatedNumber',
        valueType: 'number',
    },
};
exports.DataPointsValidationSchema = zod_1.z.object({
    generatedNumber: zod_1.z.number().int(),
});
//# sourceMappingURL=dataPoints.js.map