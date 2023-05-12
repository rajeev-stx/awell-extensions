"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dropboxSignSdk_1 = __importDefault(require("../../../common/sdk/dropboxSignSdk"));
const createEmbeddedSignatureRequestWithTemplate_1 = require("./createEmbeddedSignatureRequestWithTemplate");
jest.mock('../../../common/sdk/dropboxSignSdk');
const mocksignatureRequestCreateEmbeddedWithTemplate = jest
    .spyOn(dropboxSignSdk_1.default.SignatureRequestApi.prototype, 'signatureRequestCreateEmbeddedWithTemplate')
    .mockImplementation(async (data) => {
    console.log('mocked DropboxSignSdk.SignatureRequestApi.signatureRequestCreateEmbeddedWithTemplate', data);
    return {
        body: {
            signatureRequest: {
                signatureRequestId: 'signature-request-id',
                signatures: [
                    {
                        signatureId: 'test-signature-id',
                    },
                ],
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
const mockEmbeddedApiEmbeddedSignUrl = jest
    .spyOn(dropboxSignSdk_1.default.EmbeddedApi.prototype, 'embeddedSignUrl')
    .mockImplementation(async (data) => {
    console.log('mocked DropboxSignSdk.SignatureRequestApi.signatureRequestCreateEmbeddedWithTemplate', data);
    return {
        body: {
            embedded: {
                signUrl: 'https://developers.awellhealth.com',
                expiresAt: 1535074721,
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
describe('Create embedded signature request with template', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await createEmbeddedSignatureRequestWithTemplate_1.createEmbeddedSignatureRequestWithTemplate.onActivityCreated({
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
            },
            settings: {
                apiKey: 'apiKey',
                clientId: 'client-id',
                testMode: 'yes',
            },
        }, onComplete, jest.fn());
        expect(mocksignatureRequestCreateEmbeddedWithTemplate).toHaveBeenCalled();
        expect(mockEmbeddedApiEmbeddedSignUrl).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=createEmbeddedSignatureRequestWithTemplate.test.js.map