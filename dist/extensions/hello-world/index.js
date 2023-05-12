"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorld = void 0;
const actions_1 = require("./actions");
const settings_1 = require("./settings");
const webhooks_1 = require("./webhooks");
const marketplace_1 = require("../../lib/types/marketplace");
exports.HelloWorld = {
    key: 'hello-world',
    title: 'Hello World !',
    description: 'An example extension developers can look at to get started with building their first extension.',
    icon_url: 'https://res.cloudinary.com/da7x4rzl4/image/upload/v1678870116/Awell%20Extensions/Awell_Logo.png',
    category: marketplace_1.Category.DEMO,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    settings: settings_1.settings,
    actions: {
        log: actions_1.log,
    },
    webhooks: webhooks_1.webhooks,
};
//# sourceMappingURL=index.js.map