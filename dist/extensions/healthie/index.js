"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Healthie = void 0;
const actions_1 = require("./actions");
const settings_1 = require("./settings");
const webhooks_1 = require("./webhooks");
const marketplace_1 = require("../../lib/types/marketplace");
exports.Healthie = {
    key: 'healthie',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Healthie',
    description: 'Easily orchestrate actions in Healthie and receive webhooks events.',
    icon_url: 'https://res.cloudinary.com/da7x4rzl4/image/upload/v1678908303/Awell%20Extensions/HealthieLogo.png',
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    settings: settings_1.settings,
    actions: actions_1.actions,
    webhooks: webhooks_1.webhooks,
};
//# sourceMappingURL=index.js.map