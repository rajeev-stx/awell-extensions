"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
jest.mock('../../calComApi');
describe('Simple getBooking action', () => {
    const onComplete = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
    });
    test('Should call the onComplete callback', async () => {
        await __1.getBooking.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                bookingId: '123',
            },
            settings: {
                apiKey: 'apiKey',
            },
        }, onComplete, jest.fn());
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=getBooking.js.map