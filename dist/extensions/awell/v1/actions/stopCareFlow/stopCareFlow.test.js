"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stopCareFlow_1 = require("./stopCareFlow");
jest.mock('../../sdk/awellSdk');
describe('Stop care flow', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await stopCareFlow_1.stopCareFlow.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                reason: 'Just because I can',
            },
            settings: {
                apiUrl: 'an-api-url',
                apiKey: 'an-api-key',
            },
        }, onComplete, onError);
        expect(onComplete).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=stopCareFlow.test.js.map