"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const deleteAppointment_1 = require("../deleteAppointment");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('deleteAppointment action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should delete an appointment", async () => {
        await deleteAppointment_1.deleteAppointment.onActivityCreated({
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
        expect(sdk_2.mockGetSdkReturn.deleteAppointment).toHaveBeenCalledWith({
            id: 'appointment-1'
        });
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=deleteAppointment.js.map