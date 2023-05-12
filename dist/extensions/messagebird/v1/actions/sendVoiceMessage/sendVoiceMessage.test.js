"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
jest.mock('../../../common/sdk/messagebirdSdk');
describe('Send voice message', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await __1.sendVoiceMessage.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                originator: 'MessageBird',
                recipient: '+32476581696',
                body: 'Hi, you are a beautiful person!',
                language: 'en-gb',
                voice: 'female',
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
//# sourceMappingURL=sendVoiceMessage.test.js.map