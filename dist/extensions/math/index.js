"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathExtension = void 0;
const actions_1 = require("./v1/actions");
const settings_1 = require("./settings");
const marketplace_1 = require("../../lib/types/marketplace");
exports.MathExtension = {
    key: 'math',
    category: marketplace_1.Category.MATH,
    title: 'Math',
    icon_url: 'https://res.cloudinary.com/da7x4rzl4/image/upload/v1679592864/Awell%20Extensions/maths.png',
    description: 'The Math extension provides some useful actions to perform simple mathematical operations.',
    settings: settings_1.settings,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    actions: {
        generateRandomNumber: actions_1.generateRandomNumber,
        calculateDateDifference: actions_1.calculateDateDifference,
    },
};
//# sourceMappingURL=index.js.map