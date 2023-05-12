"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
jest.mock('../../../common/sdk/messagebirdSdk');
describe('Send WhatsApp message', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await __1.sendWhatsAppMessage.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                from: 'WHATSAPP-CHANNEL-ID',
                to: '+32xxxxxxx',
                content: 'Hello there!',
            },
            settings: {
                apiKey: 'apiKey',
                reportUrl: 'https://developers.messagebird.com/',
            },
        }, onComplete, onError);
        expect(onComplete).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=sendWhatsAppMessage.test.js.map