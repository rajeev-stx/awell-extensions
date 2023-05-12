"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBird = void 0;
const marketplace_1 = require("../../lib/types/marketplace");
const actions_1 = require("./v1/actions");
const settings_1 = require("./settings");
exports.MessageBird = {
    key: 'messagebird',
    title: 'MessageBird',
    icon_url: 'https://developers.messagebird.com/img/glyph.svg',
    description: 'MessageBird is a cloud-based communication platform with support for a variety of channels including WhatsApp, voice, live chat and more.',
    category: marketplace_1.Category.COMMUNICATION,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    actions: {
        sendSms: actions_1.sendSms,
        sendWhatsAppMessage: actions_1.sendWhatsAppMessage,
        sendVoiceMessage: actions_1.sendVoiceMessage,
    },
    settings: settings_1.settings,
};
//# sourceMappingURL=index.js.map