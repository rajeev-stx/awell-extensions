"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookAppointment = void 0;
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const fields = {
    calLink: {
        id: 'calLink',
        label: 'Cal Link',
        description: 'The Cal Link that you want to embed e.g. "john". Just give the username. No need to give the full URL https://cal.com/john.',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
const dataPoints = {
    bookingId: {
        key: 'bookingId',
        valueType: 'string',
    },
};
exports.bookAppointment = {
    key: 'bookAppointment',
    title: 'Book appointment',
    description: 'Enable a stakeholder to book an appointment via Cal.com.',
    category: marketplace_1.Category.SCHEDULING,
    fields,
    dataPoints,
    options: {
        stakeholders: {
            label: 'Stakeholder',
            mode: 'single',
        },
    },
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        const { fields: { calLink }, } = payload;
        if (calLink === undefined) {
            await onError({
                events: [
                    {
                        date: new Date().toISOString(),
                        text: { en: 'Missing required fields (e.g. calLink)' },
                    },
                ],
            });
        }
    },
};
//# sourceMappingURL=bookAppointment.js.map