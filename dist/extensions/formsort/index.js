"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formsort = void 0;
const marketplace_1 = require("../../lib/types/marketplace");
const actions_1 = require("./v1/actions");
const settings_1 = require("./settings");
exports.Formsort = {
    key: 'formsort',
    title: 'Formsort',
    icon_url: 'https://images.saasworthy.com/formsort_30763_logo_1658487172_csumf.jpg',
    description: 'Formsort is a fully-managed form-building platform.',
    category: marketplace_1.Category.FORMS,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    actions: {
        completeFlow: actions_1.completeFlow,
    },
    settings: settings_1.settings,
};
//# sourceMappingURL=index.js.map