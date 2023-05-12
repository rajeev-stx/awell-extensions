"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dropboxSignSdk_1 = __importDefault(require("../../../common/sdk/dropboxSignSdk"));
const __1 = require("..");
jest.mock('../../../common/sdk/dropboxSignSdk');
const mockFn = jest
    .spyOn(dropboxSignSdk_1.default.SignatureRequestApi.prototype, 'signatureRequestCancel')
    .mockImplementation(async () => {
    console.log('mocked DropboxSignSdk.SignatureRequestApi.signatureRequestCancel');
    return {
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
        await __1.cancelSignatureRequest.onActivityCreated({
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
            },
            settings: {
                apiKey: 'apiKey',
                clientId: 'client-id',
                testMode: 'yes',
            },
        }, onComplete, onError);
        expect(mockFn).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=cancelSignatureRequest.test.js.map