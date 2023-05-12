"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetPatient = void 0;
const validation_1 = require("../../../lib/shared/validation");
const validateGetPatient = (user) => {
    const phoneValidationResult = validation_1.E164PhoneValidationOptionalSchema.safeParse(user === null || user === void 0 ? void 0 : user.phone_number);
    const dobValidationResult = validation_1.DateTimeOptionalSchema.safeParse(user === null || user === void 0 ? void 0 : user.dob);
    return {
        data: {
            dob: dobValidationResult.success ? dobValidationResult.data : undefined,
            phoneNumber: phoneValidationResult.success
                ? phoneValidationResult.data
                : undefined,
        },
        events: phoneValidationResult.success && dobValidationResult.success
            ? undefined
            : [
                ...(phoneValidationResult.success
                    ? []
                    : [
                        {
                            date: new Date().toISOString(),
                            text: {
                                en: `Phone number from Healthie (${String(user === null || user === void 0 ? void 0 : user.phone_number)}) not stored because it isn't a valid E.164 phone number`,
                            },
                            error: {
                                category: 'WRONG_DATA',
                                message: `Phone number from Healthie (${String(user === null || user === void 0 ? void 0 : user.phone_number)}) not stored because it isn't a valid E.164 phone number`,
                            },
                        },
                    ]),
                ...(dobValidationResult.success
                    ? []
                    : [
                        {
                            date: new Date().toISOString(),
                            text: {
                                en: `DOB from Healthie (${String(user === null || user === void 0 ? void 0 : user.dob)}) not stored because it isn't a valid ISO8601 date`,
                            },
                            error: {
                                category: 'WRONG_DATA',
                                message: `DOB from Healthie (${String(user === null || user === void 0 ? void 0 : user.dob)}) not stored because it isn't a valid ISO8601 date`,
                            },
                        },
                    ]),
            ],
    };
};
exports.validateGetPatient = validateGetPatient;
//# sourceMappingURL=getPatient.zod.js.map