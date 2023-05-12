"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockSdk = {
    client: jest.fn((params) => {
        console.log('Calling mock Mailgun client function', params);
        return {
            messages: {
                create: jest.fn((domain, params) => {
                    console.log('Mocking Mailgun SDK call to messages.create', params);
                }),
            },
        };
    }),
};
exports.default = mockSdk;
//# sourceMappingURL=mailgunSdk.js.map