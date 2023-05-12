"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCreatePatient = void 0;
const dataPoints = {
    patientId: {
        key: 'patientId',
        valueType: 'string',
    },
};
exports.onCreatePatient = {
    key: 'onCreatePatient',
    dataPoints,
    onWebhookReceived: async ({ data }) => {
        return {
            data_points: { patientId: String(data.id) },
        };
    },
};
//# sourceMappingURL=onCreatePatient.js.map