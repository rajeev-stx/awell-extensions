"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailchimp = void 0;
const marketplace_1 = require("../../lib/types/marketplace");
const actions_1 = require("./v1/actions");
const settings_1 = require("./settings");
exports.Mailchimp = {
    key: 'mailchimp',
    title: 'Mailchimp',
    icon_url: 'https://res.cloudinary.com/da7x4rzl4/image/upload/v1681285075/Awell%20Extensions/Mailchimp-Logo.png',
    description: 'Mailchimp is an all-in-one marketing platform that helps businesses to design, send, and manage email campaigns.',
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