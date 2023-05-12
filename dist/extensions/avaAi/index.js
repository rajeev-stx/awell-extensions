"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaAi = void 0;
const marketplace_1 = require("../../lib/types/marketplace");
const actions_1 = require("./v1/actions");
const settings_1 = require("./settings");
exports.AvaAi = {
    key: 'avaAi',
    title: 'Ava - Awell Virtual (AI) Assistant',
    icon_url: 'https://res.cloudinary.com/da7x4rzl4/image/upload/v1681032937/Awell%20Extensions/Avatar.png',
    description: `Ava is "Awell's Virtual (AI) Assistant that can help you automate simple tasks in your care flow.`,
    category: marketplace_1.Category.AI,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    actions: {
        generatePatientSummary: actions_1.generatePatientSummary,
    },
    settings: settings_1.settings,
};
//# sourceMappingURL=index.js.map