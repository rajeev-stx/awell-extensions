"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const createChartingNote_1 = require("../createChartingNote");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('createChartingNote action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should create a charting note", async () => {
        await createChartingNote_1.createChartingNote.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                form_id: 'form-template-1',
                healthie_patient_id: 'patient-1',
                note_content: 'Test content'
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url'
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.getFormTemplate).toHaveBeenCalled();
        expect(sdk_2.mockGetSdkReturn.createFormAnswerGroup).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=createChartingNote.js.map