"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const archivePatient_1 = require("../archivePatient");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('archivePatient action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should archive a patient", async () => {
        await archivePatient_1.archivePatient.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                id: 'patient-1'
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url'
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.updatePatient).toHaveBeenCalledWith({ input: { id: 'patient-1', active: false } });
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=archivePatient.js.map