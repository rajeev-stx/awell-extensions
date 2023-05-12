"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const completeFlow_1 = require("./completeFlow");
describe('Complete flow action', () => {
    const onComplete = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
    });
    test('Should not call the onComplete callback', async () => {
        await completeFlow_1.completeFlow.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                clientLabel: 'client-label',
                flowLabel: 'flow-label',
                variantLabel: 'variant-label',
            },
            settings: {
                apiKey: 'abc123',
                environment: 'production',
            },
        }, onComplete, jest.fn());
        /**
         * Because completion is done in Awell Hosted Pages
         */
        expect(onComplete).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=completeFlow.test.js.map