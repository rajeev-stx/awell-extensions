"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const updatePatient_1 = require("../updatePatient");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('updatePatient action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        ;
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Should update patient', async () => {
        await updatePatient_1.updatePatient.onActivityCreated({
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
                first_name: 'test',
                last_name: 'test',
                legal_name: undefined,
                email: undefined,
                phone_number: undefined,
                provider_id: undefined,
                gender: undefined,
                gender_identity: undefined,
                height: undefined,
                sex: undefined,
                user_group_id: undefined,
                active: true,
                dob: '1990-01-01',
                skipped_email: false,
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url',
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.updatePatient).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=updatePatient.js.map