"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const createLocation_1 = require("../createLocation");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('createLocation action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should create a location", async () => {
        await createLocation_1.createLocation.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                id: 'patient-1',
                name: 'Test location',
                country: '',
                state: '',
                city: '',
                zip: '',
                line1: '',
                line2: ''
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url'
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.createLocation).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=createLocation.js.map