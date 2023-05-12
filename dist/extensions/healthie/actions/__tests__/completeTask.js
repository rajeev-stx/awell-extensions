"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const completeTask_1 = require("../completeTask");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('completeTask action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should complete a task", async () => {
        await completeTask_1.completeTask.onActivityCreated({
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
        expect(sdk_2.mockGetSdkReturn.updateTask).toHaveBeenCalledWith({
            input: {
                id: 'task-1',
                complete: true
            }
        });
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=completeTask.js.map