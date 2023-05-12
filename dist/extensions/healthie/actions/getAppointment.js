"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointment = void 0;
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const fields = {
    appointmentId: {
        id: 'appointmentId',
        label: 'Appointment ID',
        description: 'The identifier of the appointment you want to retrieve.',
        type: types_1.FieldType.STRING,
    },
};
const dataPoints = {
    date: {
        key: 'date',
        valueType: 'date',
    },
    appointmentTypeId: {
        key: 'appointmentTypeId',
        valueType: 'string',
    },
    appointmentTypeName: {
        key: 'appointmentTypeName',
        valueType: 'string',
    },
    contactType: {
        key: 'contactType',
        valueType: 'string',
    },
    patientId: {
        key: 'patientId',
        valueType: 'string',
    },
};
exports.getAppointment = {
    key: 'getAppointment',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Get appointment',
    description: 'Retrieve the details of an appointment in Healthie.',
    fields,
    dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const { fields, settings } = payload;
        const { appointmentId } = fields;
        try {
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.getAppointment({
                    id: appointmentId,
                });
                await onComplete({
                    data_points: {
                        appointmentTypeId: (_b = (_a = data.appointment) === null || _a === void 0 ? void 0 : _a.appointment_type) === null || _b === void 0 ? void 0 : _b.id,
                        appointmentTypeName: (_d = (_c = data.appointment) === null || _c === void 0 ? void 0 : _c.appointment_type) === null || _d === void 0 ? void 0 : _d.name,
                        contactType: (_e = data.appointment) === null || _e === void 0 ? void 0 : _e.contact_type,
                        date: (_f = data.appointment) === null || _f === void 0 ? void 0 : _f.date,
                        patientId: (_h = (_g = data === null || data === void 0 ? void 0 : data.appointment) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.id,
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
//# sourceMappingURL=getAppointment.js.map