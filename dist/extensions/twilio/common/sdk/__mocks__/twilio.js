"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockSdk = {
    messages: {
        create: jest.fn((params) => {
            console.log('Mocking twilio SDK call to messages.create', params);
        }),
    },
};
const mockConstructor = jest.fn((params) => {
    console.log('Calling mock twilio constructor', params);
    return mockSdk;
});
exports.default = mockConstructor;
//# sourceMappingURL=twilio.js.map