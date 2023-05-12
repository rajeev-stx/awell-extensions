"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const deleteTask_1 = require("../deleteTask");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('deleteTask action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should delete a task", async () => {
        await deleteTask_1.deleteTask.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                id: 'task-1'
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url'
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.deleteTask).toHaveBeenCalledWith({
            id: 'task-1',
        });
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=deleteTask.js.map