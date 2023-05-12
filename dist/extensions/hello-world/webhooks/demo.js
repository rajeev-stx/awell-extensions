"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demo = void 0;
const dataPoints = {
    eventType: {
        key: 'eventType',
        valueType: 'string',
    },
    hello: {
        key: 'webhookDataPoint',
        valueType: 'string',
    },
};
exports.demo = {
    key: 'demo',
    dataPoints,
    onWebhookReceived: async ({ eventType, hello }) => ({
        data_points: {
            eventType,
            hello,
        },
    }),
};
//# sourceMappingURL=demo.js.map