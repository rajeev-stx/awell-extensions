"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
exports.settings = {
    apiKey: {
        label: 'API Key',
        key: 'apiKey',
        obfuscated: true,
        required: true,
        description: 'Your MessageBird API key.',
    },
    reportUrl: {
        label: 'Report URL',
        key: 'reportUrl',
        obfuscated: false,
        required: false,
        description: 'The URL for delivery of status reports for messages. Must be HTTPS.',
    },
};
//# sourceMappingURL=settings.js.map