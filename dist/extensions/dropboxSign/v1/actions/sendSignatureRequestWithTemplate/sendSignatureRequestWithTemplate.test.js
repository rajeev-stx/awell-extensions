"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dropboxSignSdk_1 = __importDefault(require("../../../common/sdk/dropboxSignSdk"));
const __1 = require("..");
jest.mock('../../../common/sdk/dropboxSignSdk');
const mockFn = jest
    .spyOn(dropboxSignSdk_1.default.SignatureRequestApi.prototype, 'signatureRequestSendWithTemplate')
    .mockImplementation(async (data) => {
    console.log('mocked DropboxSignSdk.SignatureRequestApi.signatureRequestSendWithTemplate', data);
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
describe('Cancel signature request action', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await __1.sendSignatureRequestWithTemplate.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                signerRole: 'Client',
                signerName: 'John Doe',
                signerEmailAddress: 'hello@patient.com',
                templateId: 'template-1',
                title: 'A title',
                subject: 'A subject',
                message: 'A message',
                signingRedirectUrl: 'https://developers.hellosign.com/',
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
//# sourceMappingURL=sendSignatureRequestWithTemplate.test.js.map