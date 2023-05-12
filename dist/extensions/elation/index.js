"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elation = void 0;
const actions_1 = require("./actions");
const settings_1 = require("./settings");
const marketplace_1 = require("../../lib/types/marketplace");
const webhooks_1 = require("./webhooks");
exports.Elation = {
    key: 'elation',
    title: 'Elation',
    description: "Elation is a clinical-first EHR and patient engagement tool. It's designed for the craft of primary care medicine.",
    icon_url: 'https://res.cloudinary.com/da7x4rzl4/image/upload/v1680683235/Awell%20Extensions/elation_favicon.png',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    settings: settings_1.settings,
    actions: actions_1.actions,
    webhooks: webhooks_1.webhooks,
};
//# sourceMappingURL=index.js.map