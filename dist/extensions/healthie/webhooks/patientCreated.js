"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientCreated = void 0;
const dataPoints = {
    patientId: {
        key: 'patientId',
        valueType: 'string',
    },
};
exports.patientCreated = {
    key: 'patientCreated',
    dataPoints,
    onWebhookReceived: async ({ resource_id }) => ({
        data_points: {
            patientId: resource_id,
        },
    }),
};
//# sourceMappingURL=patientCreated.js.map