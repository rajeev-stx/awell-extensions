"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const awellSdk_1 = __importDefault(require("../../sdk/awellSdk"));
const searchPatientsByPatientCode_1 = require("./searchPatientsByPatientCode");
jest.mock('../../sdk/awellSdk');
const mockFn = jest
    .spyOn(awellSdk_1.default.prototype, 'searchPatientsByPatientCode')
    .mockImplementationOnce(async (input) => {
    console.log('mocked AwellSdk.searchPatientsByPatientCode', input);
    return [
        {
            id: 'patient-id-1',
            profile: {
                patient_code: '123',
            },
        },
        {
            id: 'patient-id-2',
            profile: {
                patient_code: '123',
            },
        },
    ];
});
describe('Search patients by patient code', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await searchPatientsByPatientCode_1.searchPatientsByPatientCode.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: {
                id: 'patient-id-1',
                profile: {
                    patient_code: '123',
                },
            },
            fields: {
                pathwayDefinitionId: 'a-pathway-definition-id',
            },
            settings: {
                apiUrl: 'an-api-url',
                apiKey: 'an-api-key',
            },
        }, onComplete, onError);
        expect(mockFn).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                patientAlreadyExists: 'true',
                numberOfPatientsFound: '1',
                awellPatientIds: 'patient-id-2',
            },
        });
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=searchPatientsByPatientCode.test.js.map