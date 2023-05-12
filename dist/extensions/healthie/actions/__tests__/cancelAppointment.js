"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const cancelAppointment_1 = require("../cancelAppointment");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('cancelAppointment action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should cancel an appointment", async () => {
        await cancelAppointment_1.cancelAppointment.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                id: 'appointment-1'
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url'
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.updateAppointment).toHaveBeenCalledWith({
            input: {
                id: 'appointment-1',
                pm_status: 'Cancelled'
            }
        });
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=cancelAppointment.js.map