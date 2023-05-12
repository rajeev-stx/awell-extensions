"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockSdk = {
    messages: {
        create: jest.fn((params, callback) => {
            console.log('Mocking MessageBird SDK call to messages.create', params);
            const error = null;
            const message = null;
            callback(error, message);
        }),
    },
    voice_messages: {
        create: jest.fn((params, callback) => {
            console.log('Mocking MessageBird SDK call to voice_messages.create', params);
            const error = null;
            const voiceMessage = null;
            callback(error, voiceMessage);
        }),
    },
    conversations: {
        send: jest.fn((params, callback) => {
            console.log('Mocking MessageBird SDK call to conversations.send', params);
            const error = null;
            const res = null;
            callback(error, res);
        }),
    },
};
const mockConstructor = jest.fn((params) => {
    console.log('Calling mock MessageBird constructor', params);
    return mockSdk;
});
exports.default = mockConstructor;
//# sourceMappingURL=messagebirdSdk.js.map