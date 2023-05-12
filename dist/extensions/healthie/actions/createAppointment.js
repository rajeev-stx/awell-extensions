"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointment = void 0;
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const fields = {
    patientId: {
        id: 'patientId',
        label: 'Patient ID',
        description: 'The ID of the patient you want to create an appointment for.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    otherPartyId: {
        id: 'otherPartyId',
        label: 'Provider ID',
        description: 'The ID of the provider the appointment is with. If none provided, the user the API key is associated with will be used.',
        type: types_1.FieldType.STRING,
    },
    contactTypeId: {
        id: 'contactTypeId',
        label: 'Contact type ID',
        description: 'How the appointment will be conducted.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    appointmentTypeId: {
        id: 'appointmentTypeId',
        label: 'Appointment type ID',
        description: 'The ID of the appointment type.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    datetime: {
        id: 'datetime',
        label: 'Appointment date and time',
        description: 'The date and time of the appointment in ISO8601 format.',
        type: types_1.FieldType.STRING,
        required: true,
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
    title: 'Create 1:1 appointment',
    description: 'Create a 1:1 appointment in Healthie.',
    fields,
    dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        const { fields, settings } = payload;
        const { patientId, appointmentTypeId, datetime, contactTypeId, otherPartyId, } = fields;
        try {
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.createAppointment({
                    appointment_type_id: appointmentTypeId,
                    contact_type: contactTypeId,
                    other_party_id: otherPartyId,
                    datetime,
                    user_id: patientId,
                });
                await onComplete({
                    data_points: {
                        appointmentId: (_b = (_a = data.createAppointment) === null || _a === void 0 ? void 0 : _a.appointment) === null || _b === void 0 ? void 0 : _b.id,
                    },
                });
            }
            else {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'API client requires an API url and API key' },
                            error: {
                                category: 'MISSING_SETTINGS',
                                message: 'Missing api url or api key',
                            },
                        },
                    ],
                });
            }
        }
        catch (err) {
            const error = err;
            await onError({
                events: [
                    {
                        date: new Date().toISOString(),
                        text: { en: 'Healthie API reported an error' },
                        error: {
                            category: 'SERVER_ERROR',
                            message: error.message,
                        },
                    },
                ],
            });
        }
    },
};
//# sourceMappingURL=createAppointment.js.map