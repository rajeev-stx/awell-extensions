"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
describe('HelloWorld - log', () => {
    test('Should call onComplete', async () => {
        const onComplete = jest.fn();
        await __1.log.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: { id: 'test-activity' },
            patient: { id: 'test-patient' },
            fields: {
                hello: 'Some text',
            },
            settings: {
                secret: 'secret-value',
            },
        }, onComplete, jest.fn());
        expect(onComplete).toHaveBeenCalled();
    });
    test('Should call onComplete if fields are undefined', async () => {
        const onComplete = jest.fn();
        await __1.log.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: { id: 'test-activity' },
            patient: { id: 'test-patient' },
            fields: {
                hello: undefined,
            },
            settings: {
                secret: 'secret-value',
            },
        }, onComplete, jest.fn());
        expect(onComplete).toHaveBeenCalled();
    });
    test('Should call onComplete if settings are undefined', async () => {
        const onComplete = jest.fn();
        await __1.log.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: { id: 'test-activity' },
            patient: { id: 'test-patient' },
            fields: {
                hello: 'Some text',
            },
            settings: {
                secret: undefined,
            },
        }, onComplete, jest.fn());
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=log.js.map