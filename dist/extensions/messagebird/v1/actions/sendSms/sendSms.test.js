"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
jest.mock('../../../common/sdk/messagebirdSdk');
describe('Send SMS', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await __1.sendSms.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                originator: 'TestMessage',
                recipient: '+32476581696',
                body: 'Hello there!',
            },
            settings: {
                apiKey: 'an-api-key',
                reportUrl: undefined,
            },
        }, onComplete, onError);
        expect(onComplete).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=sendSms.test.js.map