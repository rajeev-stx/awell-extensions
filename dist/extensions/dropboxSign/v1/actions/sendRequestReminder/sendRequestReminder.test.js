"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dropboxSignSdk_1 = __importDefault(require("../../../common/sdk/dropboxSignSdk"));
const __1 = require("..");
jest.mock('../../../common/sdk/dropboxSignSdk');
const mockFn = jest
    .spyOn(dropboxSignSdk_1.default.SignatureRequestApi.prototype, 'signatureRequestRemind')
    .mockImplementation(async (signatureRequestId, data, options) => {
    console.log('mocked DropboxSignSdk.SignatureRequestApi.signatureRequestRemind', { signatureRequestId, data, options });
    return {
        body: {
            signatureRequest: {
                title: 'test-title',
            },
        },
        response: {
            data: {},
            status: 200,
            statusText: 'success',
            headers: {},
            config: {},
        },
    };
});
describe('Send request reminder action', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onError.mockClear();
        onComplete.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await __1.sendRequestReminder.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                signatureRequestId: '123',
                signerEmailAddress: 'hello@patient.com',
            },
            settings: {
                apiKey: 'apiKey',
                clientId: 'client-id',
                testMode: 'yes',
            },
        }, onComplete, jest.fn());
        expect(mockFn).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=sendRequestReminder.test.js.map