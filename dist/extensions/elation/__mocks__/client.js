"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAPIClient = exports.ElationAPIClient = void 0;
const constants_1 = require("./constants");
const ElationAPIClientMock = jest.fn().mockImplementation((params) => {
    return {
        getPatient: jest.fn((params) => {
            return { id: 1, ...constants_1.patientExample, mobile_phone: 'undefined' };
        }),
        createPatient: jest.fn((params) => {
            return { id: 1, ...constants_1.patientExample };
        }),
        updatePatient: jest.fn((params) => {
            return { id: 1, ...constants_1.patientExample };
        }),
        createAppointment: jest.fn((params) => {
            return {
                id: 1,
                ...constants_1.appointmentExample,
                service_location: {
                    id: constants_1.appointmentExample.service_location
                }
            };
        }),
        getAppointment: jest.fn((params) => {
            return {
                id: 1,
                ...constants_1.appointmentExample,
                service_location: {
                    id: constants_1.appointmentExample.service_location
                }
            };
        }),
    };
});
exports.ElationAPIClient = ElationAPIClientMock;
const { makeAPIClient } = jest.requireActual('../client');
const makeAPIClientMock = jest.fn((args) => {
    makeAPIClient(args);
    return new ElationAPIClientMock(args);
});
exports.makeAPIClient = makeAPIClientMock;
//# sourceMappingURL=client.js.map