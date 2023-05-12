"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../__mocks__/constants");
const createAppointment_1 = require("../createAppointment");
jest.mock('../../client');
describe('Simple create appointment action', () => {
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
        await createAppointment_1.createAppointment.onActivityCreated({
            fields: {
                ...constants_1.appointmentExample,
            },
            settings,
        }, onComplete, jest.fn());
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                appointmentId: '1',
            },
        });
    });
});
//# sourceMappingURL=createAppointment.js.map