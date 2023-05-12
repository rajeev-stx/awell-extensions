"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock = jest.fn().mockImplementation((params) => {
    console.log('Calling mock cal.com api constructor', params);
    return {
        getBooking: jest.fn((params) => {
            console.log('Mocking cal.com api', params);
            return { booking: { id: 'test' } };
        }),
    };
});
exports.default = mock;
//# sourceMappingURL=calComApi.js.map