"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointment = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const zod_1 = require("zod");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const client_1 = require("../client");
const zod_validation_error_1 = require("zod-validation-error");
const axios_1 = require("axios");
const appointment_zod_1 = require("../validation/appointment.zod");
const fields = {
    scheduled_date: {
        id: 'scheduled_date',
        label: 'Scheduled date',
        description: 'Datetime (ISO8601).',
        type: types_1.FieldType.STRING,
        required: true,
    },
    reason: {
        id: 'reason',
        label: 'Reason',
        description: 'Should not be free-text. The values are mapped to "appointment types" in the EMR. Maximum length of 50 characters.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    patient: {
        id: 'patient',
        label: 'Patient',
        description: 'Patient ID',
        type: types_1.FieldType.STRING,
        required: true,
    },
    physician: {
        id: 'physician',
        label: 'Physician',
        description: 'Physician ID',
        type: types_1.FieldType.STRING,
        required: true,
    },
    practice: {
        id: 'practice',
        label: 'Practice',
        description: 'Practice ID',
        type: types_1.FieldType.STRING,
        required: true,
    },
    duration: {
        id: 'duration',
        label: 'Duration',
        description: 'Number (in minutes). Must be a multiple of 5 and between 1 to 1440.',
        type: types_1.FieldType.STRING,
    },
    description: {
        id: 'description',
        label: 'Description',
        description: 'Maximum length of 500 characters.',
        type: types_1.FieldType.STRING,
    },
    service_location: {
        id: 'service_location',
        label: 'Service location',
        description: 'Service location ID',
        type: types_1.FieldType.STRING,
    },
    telehealth_details: {
        id: 'telehealth_details',
        label: 'Telehealth details',
        description: '',
        type: types_1.FieldType.STRING,
    },
};
const dataPoints = {
    appointmentId: {
        key: 'appointmentId',
        valueType: 'string',
    },
};
exports.createAppointment = {
    key: 'createAppointment',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Create Appointment',
    description: "Create an appointment using Elation's scheduling API.",
    fields,
    previewable: true,
    dataPoints,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        try {
            const appointment = appointment_zod_1.appointmentSchema.parse(payload.fields);
            // API Call should produce AuthError or something dif.
            const api = (0, client_1.makeAPIClient)(payload.settings);
            const { id } = await api.createAppointment(appointment);
            await onComplete({
                data_points: {
                    appointmentId: String(id),
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
                                en: `${(_a = err.status) !== null && _a !== void 0 ? _a : '(no status code)'} Error: ${err.message}`,
                            },
                            error: {
                                category: 'BAD_REQUEST',
                                message: `${(_b = err.status) !== null && _b !== void 0 ? _b : '(no status code)'} Error: ${err.message}`,
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
//# sourceMappingURL=createAppointment.js.map