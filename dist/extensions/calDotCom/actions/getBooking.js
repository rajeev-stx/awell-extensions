"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooking = void 0;
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const calComApi_1 = __importDefault(require("../calComApi"));
const fields = {
    bookingId: {
        id: 'bookingId',
        label: 'Booking ID',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
const dataPoints = {
    eventTypeId: {
        key: 'eventTypeId',
        valueType: 'string',
    },
    title: {
        key: 'title',
        valueType: 'string',
    },
    description: {
        key: 'description',
        valueType: 'string',
    },
    startTime: {
        key: 'startTime',
        valueType: 'date',
    },
    endTime: {
        key: 'endTime',
        valueType: 'date',
    },
    status: {
        key: 'status',
        valueType: 'string',
    },
};
exports.getBooking = {
    key: 'getBooking',
    title: 'Get booking',
    description: 'Get Booking and save data in Data Points',
    category: marketplace_1.Category.SCHEDULING,
    fields,
    dataPoints,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        const { fields: { bookingId }, settings: { apiKey }, } = payload;
        if (apiKey === undefined || bookingId === undefined) {
            await onError({
                events: [
                    {
                        date: new Date().toISOString(),
                        text: { en: 'Missing apiKey or bookingId' },
                    },
                ],
            });
        }
        else {
            try {
                const calComApi = new calComApi_1.default(apiKey);
                const { booking } = await calComApi.getBooking(bookingId);
                await onComplete({
                    data_points: {
                        eventTypeId: `${booking.eventTypeId}`,
                        title: booking.title,
                        description: booking.description,
                        startTime: booking.startTime,
                        endTime: booking.endTime,
                        status: booking.status,
                    },
                });
            }
            catch (error) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: {
                                en: `Error in calDotCom extension -> getBooking action: ${JSON.stringify(error)}`,
                            },
                        },
                    ],
                });
            }
        }
    },
};
//# sourceMappingURL=getBooking.js.map