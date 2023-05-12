"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointment = void 0;
const zod_1 = require("zod");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const client_1 = require("../client");
const zod_validation_error_1 = require("zod-validation-error");
const axios_1 = require("axios");
const generic_zod_1 = require("../validation/generic.zod");
const fields = {
    appointmentId: {
        id: 'appointmentId',
        label: 'Appointment ID',
        description: 'The appointment ID (a number)',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
const dataPoints = {
    scheduledDate: {
        key: 'scheduledDate',
        valueType: 'date',
    },
    reason: {
        key: 'reason',
        valueType: 'string',
    },
    patientId: {
        key: 'patientId',
        valueType: 'string',
    },
    physicianId: {
        key: 'physicianId',
        valueType: 'string',
    },
    practiceId: {
        key: 'practiceId',
        valueType: 'string',
    },
    duration: {
        key: 'duration',
        valueType: 'string',
    },
    description: {
        key: 'description',
        valueType: 'string',
    },
    serviceLocationId: {
        key: 'serviceLocationId',
        valueType: 'string',
    },
    telehealthDetails: {
        key: 'telehealthDetails',
        valueType: 'string',
    },
};
exports.getAppointment = {
    key: 'getAppointment',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Get Appointment',
    description: "Retrieve an appointment using Elation's scheduling API.",
    fields,
    previewable: true,
    dataPoints,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b, _c;
        try {
            const appointmentId = generic_zod_1.numberId.parse(payload.fields.appointmentId);
            // API Call should produce AuthError or something dif.
            const api = (0, client_1.makeAPIClient)(payload.settings);
            const appointment = await api.getAppointment(appointmentId);
            await onComplete({
                data_points: {
                    scheduledDate: appointment.scheduled_date,
                    reason: appointment.reason,
                    patientId: String(appointment.patient),
                    physicianId: String(appointment.physician),
                    practiceId: String(appointment.practice),
                    duration: String(appointment.duration),
                    description: appointment.description,
                    serviceLocationId: String((_a = appointment.service_location) === null || _a === void 0 ? void 0 : _a.id),
                    telehealthDetails: appointment.telehealth_details,
                },
            });
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const error = (0, zod_validation_error_1.fromZodError)(err);
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: error.message },
                            error: {
                                category: 'SERVER_ERROR',
                                message: error.message,
                            },
                        },
                    ],
                });
            }
            else if (err instanceof axios_1.AxiosError) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: {
                                en: `${(_b = err.status) !== null && _b !== void 0 ? _b : '(no status code)'} Error: ${err.message}`,
                            },
                            error: {
                                category: 'BAD_REQUEST',
                                message: `${(_c = err.status) !== null && _c !== void 0 ? _c : '(no status code)'} Error: ${err.message}`,
                            },
                        },
                    ],
                });
            }
            else {
                const message = err.message;
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: message },
                            error: {
                                category: 'SERVER_ERROR',
                                message,
                            },
                        },
                    ],
                });
            }
        }
    },
};
//# sourceMappingURL=getAppointment.js.map