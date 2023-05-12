"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPatient_1 = require("../getPatient");
const constants_1 = require("../../__mocks__/constants");
jest.mock('../../client');
describe('Simple get patient action', () => {
    const onComplete = jest.fn();
    const settings = {
        client_id: 'clientId',
        client_secret: 'clientSecret',
        username: 'username',
        password: 'password',
        auth_url: 'authUrl',
        base_url: 'baseUrl',
    };
    beforeEach(() => {
        onComplete.mockClear();
    });
    test('Should return with correct data_points', async () => {
        await getPatient_1.getPatient.onActivityCreated({
            fields: {
                patientId: '1',
            },
            settings,
        }, onComplete, jest.fn());
        expect(onComplete).toHaveBeenCalled();
        expect(onComplete).toBeCalledWith({
            data_points: {
                ...constants_1.patientExample,
                mobile_phone: 'undefined',
                primary_physician: String(constants_1.patientExample.primary_physician),
                caregiver_practice: String(constants_1.patientExample.caregiver_practice),
            },
        });
    });
    test('Should provide good error messaging', async () => {
        const onError = jest
            .fn()
            .mockImplementation((obj) => {
            var _a;
            return (_a = obj.events[0].error) === null || _a === void 0 ? void 0 : _a.message;
        });
        await getPatient_1.getPatient.onActivityCreated({
            fields: {
                patientId: '',
            },
            settings,
        }, onComplete, onError);
        expect(onError).toHaveBeenCalled();
        expect(onError).toHaveReturnedWith('Validation error: Requires a valid ID (number)');
    });
});
//# sourceMappingURL=getPatient.js.map