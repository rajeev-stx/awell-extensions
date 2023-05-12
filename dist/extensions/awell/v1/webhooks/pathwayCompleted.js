"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathwayCompleted = void 0;
const dataPoints = {
    pathway_definition_id: {
        key: 'pathway_definition_id',
        valueType: 'string',
    },
    complete_date: {
        key: 'complete_date',
        valueType: 'date',
    },
};
exports.pathwayCompleted = {
    key: 'pathwayCompleted',
    dataPoints,
    onWebhookReceived: async ({ pathway, complete_date }) => ({
        pathway_id: pathway.id,
        patient_id: pathway.patient_id,
        data_points: {
            pathway_definition_id: pathway.pathway_definition_id,
            complete_date,
        },
    }),
};
//# sourceMappingURL=pathwayCompleted.js.map