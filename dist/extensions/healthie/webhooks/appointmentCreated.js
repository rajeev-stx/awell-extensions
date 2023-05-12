"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentCreated = void 0;
const dataPoints = {
    appointmentId: {
        key: 'appointmentId',
        valueType: 'string',
    },
};
exports.appointmentCreated = {
    key: 'appointmentCreated',
    dataPoints,
    onWebhookReceived: async ({ resource_id }) => ({
        data_points: {
            appointmentId: resource_id,
        },
    }),
};
//# sourceMappingURL=appointmentCreated.js.map