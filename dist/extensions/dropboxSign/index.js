"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropboxSign = void 0;
const marketplace_1 = require("../../lib/types/marketplace");
const actions_1 = require("./v1/actions");
const settings_1 = require("./settings");
exports.DropboxSign = {
    key: 'dropboxSign',
    title: 'Dropbox Sign',
    icon_url: 'https://res.cloudinary.com/da7x4rzl4/image/upload/v1680191271/Awell%20Extensions/dropboxsign.png',
    description: 'Dropbox Sign (formerly HelloSign) is the easiest way to send, receive and manage legally binding electronic signatures.',
    category: marketplace_1.Category.DOCUMENT_MANAGEMENT,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    actions: {
        sendSignatureRequestWithTemplate: actions_1.sendSignatureRequestWithTemplate,
        sendRequestReminder: actions_1.sendRequestReminder,
        cancelSignatureRequest: actions_1.cancelSignatureRequest,
        getSignatureRequest: actions_1.getSignatureRequest,
        createEmbeddedSignatureRequestWithTemplate: actions_1.createEmbeddedSignatureRequestWithTemplate,
        embeddedSigning: actions_1.embeddedSigning,
    },
    settings: settings_1.settings,
};
//# sourceMappingURL=index.js.map