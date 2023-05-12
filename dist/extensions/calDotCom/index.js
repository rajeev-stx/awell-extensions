"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalDotCom = void 0;
const marketplace_1 = require("../../lib/types/marketplace");
const actions_1 = require("./actions");
const settings_1 = require("./settings");
exports.CalDotCom = {
    key: 'calDotCom',
    title: 'Cal.com',
    icon_url: 'https://cal.com/logo.svg',
    description: 'Enable scheduling in your care flows with Cal.com.',
    category: marketplace_1.Category.SCHEDULING,
    author: {
        authorType: marketplace_1.AuthorType.HTD,
    },
    actions: {
        bookAppointment: actions_1.bookAppointment,
        getBooking: actions_1.getBooking
    },
    settings: settings_1.settings,
};
//# sourceMappingURL=index.js.map