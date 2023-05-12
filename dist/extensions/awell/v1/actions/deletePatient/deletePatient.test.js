"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deletePatient_1 = require("./deletePatient");
jest.mock('../../sdk/awellSdk');
describe('Update patient', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await deletePatient_1.deletePatient.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {},
            settings: {
                apiUrl: 'an-api-url',
                apiKey: 'an-api-key',
            },
        }, onComplete, onError);
        expect(onComplete).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=deletePatient.test.js.map