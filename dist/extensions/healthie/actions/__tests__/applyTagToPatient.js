"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const applyTagToPatient_1 = require("../applyTagToPatient");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('applyTagToPatient action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should apply tag to a patient", async () => {
        await applyTagToPatient_1.applyTagToPatient.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                id: 'tag-1',
                patient_id: 'patient-1'
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url'
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.applyTagsToUser).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=applyTagToPatient.js.map