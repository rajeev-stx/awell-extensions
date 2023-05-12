"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailgun = void 0;
const marketplace_1 = require("../../lib/types/marketplace");
const actions_1 = require("./v1/actions");
const settings_1 = require("./settings");
exports.Mailgun = {
    key: 'mailgun',
    title: 'Mailgun',
    icon_url: 'https://cdn.freebiesupply.com/logos/large/2x/mailgun-logo-png-transparent.png',
    description: 'Mailgun is a cloud-based email service provider that allows for sending transactional emails.',
    category: marketplace_1.Category.COMMUNICATION,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    actions: {
        sendEmail: actions_1.sendEmail,
        sendEmailWithTemplate: actions_1.sendEmailWithTemplate,
    },
    settings: settings_1.settings,
};
//# sourceMappingURL=index.js.map