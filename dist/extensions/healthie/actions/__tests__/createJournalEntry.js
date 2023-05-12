"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const createJournalEntry_1 = require("../createJournalEntry");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('createJournalEntry action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        const mock = sdk_1.getSdk;
        mock.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Should create a journal entry', async () => {
        await createJournalEntry_1.createJournalEntry.onActivityCreated({
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
                type: 'MetricEntry',
                percieved_hungriness: 1,
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url',
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.createJournalEntry).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=createJournalEntry.js.map