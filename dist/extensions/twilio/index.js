"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Twilio = void 0;
const marketplace_1 = require("../../lib/types/marketplace");
const actions_1 = require("./v2/actions");
const settings_1 = require("./settings");
exports.Twilio = {
    key: 'twilio',
    title: 'Twilio',
    icon_url: 'https://www.vectorlogo.zone/logos/twilio/twilio-icon.svg',
    description: 'Add robust messaging capabilities to your care flow.',
    category: marketplace_1.Category.COMMUNICATION,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    actions: {
        sendSms: actions_1.sendSms,
    },
    settings: settings_1.settings,
};
//# sourceMappingURL=index.js.map