"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const createPatient_1 = require("../createPatient");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('createPatient action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        const mockSdk = sdk_1.getSdk;
        mockSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Should create a new patient', async () => {
        await createPatient_1.createPatient.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                first_name: 'test',
                last_name: 'test',
                legal_name: undefined,
                email: 'test@test.com',
                phone_number: undefined,
                provider_id: undefined,
                skipped_email: undefined,
                send_invite: undefined,
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url',
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.createPatient).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                healthiePatientId: 'patient-1',
            },
        });
    });
});
//# sourceMappingURL=createPatient.js.map