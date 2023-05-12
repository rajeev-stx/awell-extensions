"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadFiles_1 = require("./uploadFiles");
describe('Upload files action', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should not call the onComplete callback', async () => {
        await uploadFiles_1.uploadFiles.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                uploadPreset: undefined,
                folder: undefined,
                tags: 'tag-1, tag-2, tag-3',
            },
            settings: {
                cloudName: 'cloud-name',
                uploadPreset: 'upload-preset',
                folder: 'variant-label',
            },
        }, onComplete, jest.fn());
        /**
         * Because completion is done in Awell Hosted Pages
         */
        expect(onComplete).not.toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=uploadFiles.test.js.map