"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapHealthieToActivityError = void 0;
const lodash_1 = require("lodash");
const mapHealthieToActivityError = (errors) => {
    if ((0, lodash_1.isNil)(errors))
        return [];
    const nonNullErrors = errors.filter((value) => !(0, lodash_1.isNil)(value));
    return nonNullErrors.map((error) => ({
        date: new Date().toISOString(),
        text: { en: 'Healthie API reported an error' },
        error: {
            category: 'SERVER_ERROR',
            message: `Message: ${error.message}${(0, lodash_1.isNil)(error.field) ? '' : `; Field: "${error.field}"`}`,
        },
    }));
};
exports.mapHealthieToActivityError = mapHealthieToActivityError;
//# sourceMappingURL=errors.js.map